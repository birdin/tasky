"use client"

import React from 'react'
import { SessionProvider, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession()


    if(!status && status === "unauthenticated") {
        redirect("/loading")
    }

    if (status === "authenticated") {
        return (
            <>
                <SessionProvider>
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