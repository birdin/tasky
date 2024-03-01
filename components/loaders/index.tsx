import React from 'react'
import { Logo } from '@/components/logo';


type Props = {}

export function GeneralLoader({ }: Props) {
    return (
        <div className="h-[calc(100vh-100px)] flex justify-center items-center">
            <div className="flex flex-col items-center justify-center ">
                <div className="">
                    <Logo />
                </div>
                <div
                    className="flex items-center space-x-2"
                    role="status"
                >
                    <svg
                        className="h-10 w-10 animate-spin stroke-gray-700 mt-2"
                        viewBox="0 0 256 256"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            d="M128 32L128 64"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            d="M195.9 60.1L173.3 82.7"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            d="M224 128L192 128"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            d="M195.9 195.9L173.3 173.3"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            d="M128 224L128 192"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            d="M60.1 195.9L82.7 173.3"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            d="M32 128L64 128"
                        ></path>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"
                            d="M60.1 60.1L82.7 82.7"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

