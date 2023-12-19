import BgTasky from '@/assets/bg-tasky.jpg'
import { Container } from '@/components/ui'

import { Readex_Pro } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const readexPro = Readex_Pro({ subsets: ['latin'] })

export const Hero = () => {
    return (
        <div className='relative w-full'>
            <div
                className="w-full h-screen bg-center bg-cover flex items-center"
                style={{ backgroundImage: `url(${BgTasky.src})`}}
            >
                <Container width='regular'>
                    <div className="max-w-xl mx-auto text-center">
                        <h1 className={`text-center text-4xl mt-[-12rem] font-medium tracking-tighter md:text-5xl  ${readexPro.className}`}>Manage Your Tasks easily and <span className='text-[--main-color]'>efficiently!</span></h1>
                        <p className='my-4 text-lg md:text-xl text-slate-700'>Tasky is a platform which provides a powerful and intuitive Kanban board system designed to streamline your workflow and optimize task management.</p>
                        <div className="flex gap-2 items-center justify-center text-sm">
                            <a href="" className='px-3 py-2 ring-1 ring-stone-400 rounded'>Get started for free</a>
                            <a href="" className='px-3 py-2 ring-1 ring-stone-400 bg-[--main-color] text-white rounded'>Start enterprise edition</a>
                        </div>
                            <p className='mt-2 text-[14px] text-slate-600'>No credit card required</p>
                    </div>
                </Container>

            </div>
        </div>
    )
}