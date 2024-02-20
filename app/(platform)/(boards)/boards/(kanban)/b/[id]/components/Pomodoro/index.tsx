"use client"

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronDown, ChevronUp, MoreVertical, Play, SkipForward, Timer, X } from 'lucide-react';

import { PlayIcon, PauseIcon, StopIcon, SmallPlayIcon } from './icons';


type Props = {

}

function convertSecondsToMinutes(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
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
    const [referenceTime, setReferenceTime] = useState<any>(20)
    const [rounds, setRounds] = useState<any>(0)
    const [breakTime, setBreakTime] = useState<any>(5)
    const [longBreakTime, setLongBreakTime] = useState<any>(15)
    const [isBreak, setIsBreak] = useState(false)
    const [startTime, setTimeStart] = useState<any>()
    const [start, setStart] = useState(false);
    const [startBreak, setStartBreak] = useState(false)
    const [open, setOpen] = useState(false);
    const [pause, setPause] = useState(false)
    const [finished, setFinished] = useState(false);
    const [minimized, setMinimized] = useState(false);

    useEffect(() => {
        const current = new Date().getTime()
        if (start) {
            var interval = setInterval(function () {
                const value = ((current - startTime) / 1000).toFixed(0)
                if ((referenceTime - parseInt(value)) <= 0) {
                    setStart(false)
                    setFinished(true)
                    setTime(value);
                    clearInterval(interval)
                    setIsBreak(true)
                    setMinimized(false)
                    setRounds(rounds + 1)
                } else {
                    setTime(value);
                }
            }, 1000);
            return () => clearInterval(interval)
        } else {
            //setTime(0)
        }
        console.log('time', time)
    }, [time, start])

    useEffect(() => {
        if (startBreak) {
            const interval = setInterval(() => {
                const value = ((new Date().getTime() - startTime) / 1000).toFixed(0)
                setTime(value)
            }
                , 1000)
            if (breakTime * 60 - time <= 0) {
                setIsBreak(false)
                setReferenceTime(20 * 60)
                setStart(false)
                setFinished(false)
            }
            return () => clearInterval(interval)
        }
    }, [time, isBreak])

    const handleStart = () => {
        setTimeStart(new Date().getTime() - 500)
        setStart(true)
        setMinimized(el => !el)
    }

    
    const handleStartBreak = () => {
        setStart(true)
        setTimeStart(new Date().getTime() - 500)
        setReferenceTime(breakTime * 60)
        setStartBreak(true)
    }
    
    const handleStop = () => {
        setStart(false)
    }

    
    const handlePause = () => {
        setStart(false)
        setPause(true)
    }
    
    const handleStarPause = () => { 
        setTimeStart(new Date().getTime() - 500)
        console.log('Pause start',referenceTime - time)
        setReferenceTime(referenceTime - time)
        setTime(0)
        setStart(true)
    }

    const handleSkipBreak = () => {
        setReferenceTime(20 * 60)
        setTimeStart(new Date().getTime() - 500)
        setStart(true)
        setTime(0)
        setFinished(false)
        setIsBreak(false)
    }

    const handleCloseModal = () => {
        setOpen(false)
        setTime(0)
        setStart(false)
        setPause(false)
        setFinished(false)
        setIsBreak(false)
        setStartBreak(false)
        setMinimized(false)
    }

    const handleButtonSection = () => {
        if (isBreak) {
            return (
                <>
                    <div className="cursor-pointer gap-1 rounded flex items-center bg-zinc-200/90 py-1 px-3 text-sm"
                        onClick={handleStartBreak}>
                        <SmallPlayIcon size={"1.2rem"} />
                        <span className='text-sm capitalize'>
                            Break time
                        </span>
                    </div>
                    <span className='mt-1 text-xs capitalize flex'>
                        <div className="flex items-center gap-1 cursor-pointer mx-auto text-muted-foreground"
                            onClick={()=> {
                                handleSkipBreak()
                            }}>
                            <SkipForward size={12} />
                            <span>
                                Skip break
                            </span>
                        </div>
                    </span>
                </>
            )
        }

        if (start) {
            return (
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer" onClick={handlePause}>
                        <PauseIcon size={"3.5rem"} />
                    </div>
                    <div className="cursor-pointer" onClick={handleStop}>
                        <StopIcon size={"3.5rem"} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="cursor-pointer" onClick={() => {
                    if(pause) {
                        handleStarPause()
                    } else {
                        handleStart()
                    }
                }}>
                    <PlayIcon size={"3.5rem"} />
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
                    minimized ? (
                        <div className='absolute top-12 w-56 right-0 bg-white border flex items-center justify-between p-2 rounded'>
                            <div className={`mr-2 ${start && 'text-red-700 '}`}>
                                <Timer size={15} />
                            </div>
                            <div className="font-medium mr-auto">
                                {
                                    convertSecondsToMinutes((referenceTime - time) + 2)
                                }
                            </div>
                            <div className="" onClick={() => setMinimized(false)}>
                                <ChevronUp size={19} />
                            </div>
                            <div className="cursor-pointer flex items-center">
                                <DialogCloseButton handleClose={handleCloseModal} />
                            </div>
                        </div>
                    )
                        :
                        <ReactPortal wrapperId="portal">
                            <div className="absolute top-24 right-0 rounded-sm w-80 h-40 p-4 pt-0 bg-white border flex flex-col justify-between">
                                <div className="flex items-center justify-between py-2">
                                    <div className="text-sm font-medium flex items-center text-red-700 gap-1">
                                        <Timer width={15} />
                                        <span>
                                            Timer
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <div className="cursor-pointer" onClick={() => setMinimized(el => !el)}>
                                            <ChevronDown width={19} />
                                        </div>
                                        <div className="cursor-pointer flex items-center">
                                            <DialogCloseButton handleClose={handleCloseModal} />
                                        </div>
                                        <div className="">
                                            <MoreVertical width={19} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="font-semibold text-6xl">
                                        {
                                            convertSecondsToMinutes(referenceTime - time)
                                        }
                                    </div>
                                    <div className="text-gray-600">
                                        {
                                            handleButtonSection()
                                        }
                                    </div>
                                </div>
                                <div className="flex text-sm font-medium justify-end">
                                    Round: {rounds}
                                </div>
                            </div>
                        </ReactPortal >
                )
            }
        </>
    )
}

const DialogCloseButton = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button>
                    <X width={19} />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Close pomodoro</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={handleClose}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
