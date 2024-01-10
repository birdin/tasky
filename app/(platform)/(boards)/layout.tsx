"use client"

import React from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'


const DashboardLayout = ({ children }: { children: React.ReactNode}) => {
    const { data: session, status } = useSession()


    if(!status && status === "unauthenticated") {
        redirect("/loading")
    }

    if (status === "authenticated") {
        console.log({session})
        //Verify if there is a session token
        /*
            Verify if it is valid /api/auth/verify
            If it is valid, then continue
            If it is not valid
                - Try to login with the refresh token
                - If it is valid, then continue
                - If it is not valid, sing up new user

        */
        return (
            <>
                <SessionProvider>
                    <Navbar/>
                    {children}
                </SessionProvider>
            </>
        )
    } 

    if(status === "loading") {
        return (
            <h1>Loading</h1>
        )
    }
}

export default DashboardLayout