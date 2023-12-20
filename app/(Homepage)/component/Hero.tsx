import BgTasky from '@/assets/bg-tasky.webp'
import HeroImg from '@/assets/hero-img.png'
import { Container } from '@/components/ui'

import { Readex_Pro } from 'next/font/google'
import { Suspense } from 'react'
import Image from 'next/image'

// If loading a variable font, you don't need to specify the font weight
const readexPro = Readex_Pro({ subsets: ['latin'] })

export const Hero = () => {
    return (
        <div className='relative w-full'>
            <div
                className="w-full h-screen bg-center bg-cover flex items-center"
                style={{ backgroundImage: `url(${BgTasky.src})` }}
            >
                <Container width='regular'>
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className={`text-center text-4xl mt-[-13rem] font-medium tracking-tighter md:text-6xl ${readexPro.className}`}>
                            <Suspense fallback={<h1>Loading</h1>}>
                                Manage Your Tasks easily and <span className='text-[--main-color]'>efficiently</span>!
                            </Suspense>
                        </h1>
                        <p className='my-6 text-lg md:text-xl text-slate-700'>
                            Tasky is a platform which provides a powerful and intuitive Kanban board system designed to streamline your workflow and optimize task management.
                        </p>
                        <div className="flex gap-2 items-center justify-center text-sm flex-wrap md:flex-nowrap">
                            <a href="" className='px-3 py-2 ring-1 ring-stone-300 rounded order-last md:order-first flex items-center gap-2 hover:shadow-red-500 transition-all hover:bg-neutral-100 hover:translate-x-0 shadow-orange-300 shadow-2xl'>
                                Discover now
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    fill="none"
                                    viewBox="0 0 22 22"
                                >
                                    <path
                                        fill="#434343"
                                        d="M11 18.48A7.474 7.474 0 013.52 11 7.474 7.474 0 0111 3.52 7.474 7.474 0 0118.48 11 7.474 7.474 0 0111 18.48zM11 4.4A6.591 6.591 0 004.4 11c0 3.652 2.948 6.6 6.6 6.6 3.652 0 6.6-2.948 6.6-6.6 0-3.652-2.948-6.6-6.6-6.6z"
                                    ></path>
                                    <path
                                        fill="#434343"
                                        d="M10.868 15.268l-.616-.616L13.904 11l-3.652-3.652.616-.616L15.136 11l-4.268 4.268z"
                                    ></path>
                                    <path fill="#434343" d="M7.04 10.56h7.48v.88H7.04v-.88z"></path>
                                </svg>
                            </a>
                            <a href="" className='px-3 py-2 ring-1 flex items-center gap-2 ring-stone-400 bg-[--main-color] text-white rounded shadow-2xl shadow-red-600'>
                                Get started for free
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="9"
                                    fill="none"
                                    viewBox="0 0 13 9"
                                >
                                    <path
                                        fill="#fff"
                                        d="M7.828 8.536l-.616-.616 3.652-3.652L7.212.616 7.828 0l4.268 4.268-4.268 4.268z"
                                    ></path>
                                    <path fill="#fff" d="M0 3.828h11.48v.88H0v-.88z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </Container>

            </div>
            <div className="hidden md:flex justify-center mt-[-16rem]">
                <Image src={HeroImg.src}
                    width={1000}
                    height={900}
                    alt='Hero image'
                />
            </div>
        </div>
    )
}

