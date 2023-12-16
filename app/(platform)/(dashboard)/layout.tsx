"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return (
            <>
                {children}
            </>
        )
    } 

    if(status === "loading") {
        return (
            <h1>Loading</h1>
        )
    }

    if(status === "unauthenticated") {
        redirect("/")
    }
}

export default DashboardLayout