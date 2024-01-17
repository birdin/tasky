"use client"

import { PauseCircle, Play, Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';


type Props = {

}

function ReactPortal({ children, wrapperId }: {
    children: React.ReactNode,
    wrapperId: string
}) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);

    const element = document.getElementById(wrapperId)
    if (!element) {
        return null
    }

    return createPortal(children, element);
}

export const Pomodoro = () => {
    const [time, setTime] = useState<any>(0)
    const [startTime, setTimeStart] = useState<any>()
    const [start, setStart] = useState(false);

    useEffect(() => {
        const current = new Date().getTime()
        if (start) {
            var interval = setInterval(function () {
                const value = ((current - startTime) / 1000).toFixed(0)
                setTime(value);
            }, 1000);
            return () => clearInterval(interval)
        } else {
            setTime(0)
        }
        console.log('time', time)
    }, [time, start])

    const handleStart = () => {
        setTimeStart(new Date().getTime())
        setStart(true)
    }

    const handleStop = () => {
        setStart(false)
    }
    return (
        <>
            <div className='ml-auto cursor-pointer'>
                <div className='font-bold' onClick={handleStart}>
                    <Timer />
                </div>
            </div>
            <ReactPortal wrapperId="portal">

                <div className="absolute bottom-0 w-80 h-40 p-4 bg-white">
                    <div className="flex justify-between items-center">
                        <div className="font-medium text-5xl">
                            {time}
                        </div>
                        <div className="text-gray-600">

                            {
                                start ? (
                                    <div className="cursor-pointer" onClick={handleStop}>
                                        <PauseCircle size={"3rem"} />
                                    </div>
                                ) : (
                                    <div className="cursor-pointer" onClick={handleStart}>
                                        <Play size={"2.5rem"} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </ReactPortal>
        </>
    )
}

