"use client"

import React, { useEffect } from 'react'
import { getCookie, setCookie } from "cookies-next";
import { SessionProvider, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { useIsAuth } from '@/hooks/useIsAuth';
import { Logo } from '@/components/logo';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = React.useState(true)
    const { data: session, status } = useSession()
    const cookie = getCookie("token_2sl");

    const { isLoadded, isAuthenticated, error } = useIsAuth(cookie);

    /**
     *  Verify if the user is authenticated 
     */
    useEffect(() => {
        if (status === "authenticated") {
            if (cookie) {
                if (!isLoadded) {
                    if (!isAuthenticated) {
                        setCookieToken()
                    }
                }
            } else {
                setCookieToken()
            }
        }
        return;
    }
        , [status, isLoadded, isAuthenticated])

    const setCookieToken = () => {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", session?.user?.email || "");
        urlencoded.append("name", session?.user?.name || "");

        fetch("http://api_taski.test/api/auth/sessionToken", {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(response => {
                console.log(response?.data?.token)
                setCookie("token_2sl", response?.data?.token);
                const rt = getCookie("token_2sl");
            })
            .catch(error => console.log('error', error)).finally(() => {
                setLoading(false)
            });

    }

    if (isLoadded) {
        return (
            <>
                <SessionProvider>
                    <Navbar />
                    <div className="h-[calc(100vh-20px)] flex justify-center items-center">
                        <div className="flex flex-col items-center justify-center ">
                            <div className="mt-[-5rem]">
                                <div className="">
                                    <Logo />
                                </div>
                                <div className="">
                                    <div className="flex justify-center items-center mt-6">
                                        <div className="relative inline-flex">
                                            <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                                            <div className="w-6 h-6 bg-gray-600 rounded-full absolute top-0 left-0 animate-ping"></div>
                                            <div className="w-6 h-6 bg-gray-600 rounded-full absolute top-0 left-0 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SessionProvider> d
            </>
        )
    }

    if (error) {
        return (
            <h1>op
                Ups! there was an error. Please try again later.
            </h1>
        )
    }

    if (!status && status === "unauthenticated") {
        redirect("/loading")
    }

    if (status === "authenticated" && isAuthenticated && cookie) {
        return (
            <>
                <SessionProvider>
                    <Navbar />
                    {children}
                </SessionProvider>
            </>
        )
    }

    if (status === "loading") {
        return (
            <>
                <SessionProvider>
                    <Navbar />
                    <h1>Loading</h1>
                </SessionProvider>
            </>

        )
    }
}

export default DashboardLayout