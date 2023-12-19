"use client";

import { Container } from "@/components/ui";
import Link from "next/link";
import {signIn, useSession, signOut} from "next-auth/react";
import { Logo } from "./logo";
import { MenuIcon } from "./icons";

export const Navbar = () => {
    const {data: session} = useSession();
    return (
        <header className="bg-[#F9FAFB] py-1 md:py-2 border-b">
            <Container width="full">
                <div className="flex items-center justify-between">
                    <Link href="/boards" className="flex items-center gap-1">
                        <Logo />
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
        <header className="bg-[#F9FAFB] py-1 md:py-2 border-b">
            <Container width="full">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-1">
                        <Logo />
                    </Link>
                    <div className="hidden md:flex items-center text-sm gap-4">
                        <Link href="/login">
                            Log in
                        </Link>
                        <Link href="/signup" className="bg-[--main-color] py-2 px-3 text-white rounded">
                            Get it for free
                        </Link>
                    </div>
                    <div className="md:hidden cursor-pointer">
                        <MenuIcon />
                    </div>
                </div>
            </Container>
        </header>
    )
}
