"use client";

import { Container } from "@/components/ui";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import { Logo } from "./logo";
import { MenuIcon } from "./icons";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const Navbar = () => {
    const { data: session } = useSession();
    return (
        <header className="bg-[#F9FAFB] py-1 md:py-2 border-b">
            <Container width="full">
                <div className="flex items-center justify-between text-sm">
                    <Link href="/boards" className="flex items-center gap-1">
                        <Logo />
                    </Link>
                    <div className="flex gap-3 items-center">
                        <p><a href="">{session?.user?.name}</a></p>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded-full w-8 h-8">
                                {
                                    session?.user?.image
                                        ? <img src={session?.user?.image} alt="" className="rounded-full w-8 h-8" />
                                        : (<div className="rounded-full w-8 h-8 bg-amber-500 flex justify-center items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25"
                                                height="25"
                                                fill="none"
                                                viewBox="0 0 25 25"
                                            >
                                                <path
                                                    stroke="#fff"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12.5 13.542a5.208 5.208 0 100-10.417 5.208 5.208 0 000 10.417zM20.833 21.875a8.333 8.333 0 10-16.666 0"
                                                ></path>
                                            </svg>
                                        </div>)
                                }
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-5">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>
                                    <div className="cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
