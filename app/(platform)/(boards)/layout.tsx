"use client"

import React, { useEffect } from 'react'
import { getCookie, setCookie } from "cookies-next";
import { SessionProvider, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = React.useState(true)
    const { data: session, status } = useSession()
    const cookie = getCookie("token_2sl");

    console.log('Cookie', cookie)

    const { isLoadded, isAuthenticated } = useIsAuth(cookie);

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
                <h1>Page is loading…</h1>
            </>
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
            <h1>Loading</h1>
        )
    }
}

function useIsAuth($token: any): any {
    const [isLoadded, setIsLoadded] = React.useState(true)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + $token);


    fetch("http://api_taski.test/api/user", {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => {
            if (result === "Unauthorized") {
                setIsAuthenticated(false)
            } else {
                setIsAuthenticated(true)
            }
        })
        .catch(error => error)
        .finally(() => {
            setIsLoadded(false)
        });

    return {
        isLoadded,
        isAuthenticated
    }
}

export default DashboardLayout