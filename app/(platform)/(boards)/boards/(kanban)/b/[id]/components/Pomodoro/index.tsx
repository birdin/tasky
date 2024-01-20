"use client"

import { PauseCircle, Play, StopCircle, Timer } from 'lucide-react';
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
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const current = new Date().getTime()
        if (start) {
            var interval = setInterval(function () {
                const value = ((current - startTime) / 1000).toFixed(0)
                console.log('value', value)
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

    const handleButtonSection = () => {
        if (start) {
            return (
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer" onClick={handleStop}>
                        <PauseCircle size={"2.8rem"} />
                    </div>
                    <div className="cursor-pointer">
                        <StopCircle size={"2.8rem"} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="cursor-pointer" onClick={handleStart}>
                    <Play size={"2.5rem"} />
                </div>
            )
        }
    }

    return (
        <>
            <div className='ml-auto cursor-pointer'>
                <div className='font-bold' onClick={() => setOpen(e => !e)}>
                    <Timer />
                </div>
            </div>
            {
                open && (

                    <ReactPortal wrapperId="portal">
                        <div className="absolute top-24 right-0 rounded-sm w-80 h-40 p-4 bg-white">
                            <div className="flex justify-between items-center">
                                <div className="font-medium text-5xl">
                                    {time}
                                </div>
                                <div className="text-gray-600">
                                    {
                                        handleButtonSection()
                                    }
                                </div>
                            </div>
                        </div>
                    </ReactPortal >
                )
            }
        </>
    )
}

