"use client";

import { Container } from "@/components/ui";
import Link from "next/link";
import {signIn, useSession, signOut} from "next-auth/react";

export const Navbar = () => {
    const {data: session} = useSession();

    console.log(session?.user?.name);
    return (
        <header className="bg-white shadow">
            <Container width="full">
                <div className="flex items-center justify-between">
                    <Link href="/boards" className="flex items-center gap-1">
                        <img src="/logo.svg" alt="Tasky" className="h-8" />
                        <h1>TASKY</h1>
                    </Link>
                    <div className="flex">
                        <p><a href="">{ session?.user?.name }</a></p>
                        <div onClick={() => signOut({callbackUrl:"/"}) }>Sign out</div>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export const HomepageNavbar = () => {
    return (
        <header className="bg-white shadow">
            <Container width="full">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-1">
                        <img src="/logo.svg" alt="Tasky" className="h-8" />
                        <h1>TASKY</h1>
                    </Link>
                    <div className="flex">
                        <div onClick={() => {signIn()}}>Sign in</div>
                        <a href="/signup">Get it for free</a>
                    </div>
                </div>
            </Container>
        </header>
    )
}
