"use client"

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChevronDown, ChevronUp, MoreVertical, Play, SkipForward, Timer, X } from 'lucide-react';

import { PlayIcon, PauseIcon, StopIcon, SmallPlayIcon } from './icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { useAtom } from 'jotai';
import { breakTimeAtom, configTimeAtom } from '@/store';
import { toast } from "sonner"



type Props = {
    data: any,
    onUpdateTime: ({ slug, body }: { slug: any, body: any }) => void
}

function convertSecondsToMinutes(seconds: number) {
    if(seconds < 0){
        console.error('Seconds cannot be negative', seconds)
        return '0:00'
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
}

function getCurrentDate() {
    const currentDate = new Date()
    return `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDate()}`

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

export const Pomodoro = ({ data, onUpdateTime }: Props) => {
    const [configTime, setConfigTime] = useAtom(configTimeAtom);
    const [time, setTime] = useState<any>(0)
    const [referenceTime, setReferenceTime] = useState<any>(configTime)
    const [rounds, setRounds] = useState<any>(0)
    const [breakTime, setBreakTime] = useAtom(breakTimeAtom);
    const [longBreakTime, setLongBreakTime] = useState<any>(15)
    const [isBreak, setIsBreak] = useState(false)
    const [startTime, setTimeStart] = useState<any>()
    const [start, setStart] = useState(false);
    const [startBreak, setStartBreak] = useState(false)
    const [open, setOpen] = useState(false);
    const [pause, setPause] = useState(false)
    const [finished, setFinished] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [date, setDate] = useState<string>('')

    const bellAudio = new Audio('https://icharliearaiza.github.io/smarttab.github.io/assets/audio/bell.wav')
    const pressAudio = new Audio('https://icharliearaiza.github.io/smarttab.github.io/assets/audio/button-press.wav')

    /*
        Use effect compponents
    */
    useEffect(() => {
        if (data) {
            if (data?.time) {
                const dataResponse = JSON.parse(data?.time)
                if (dataResponse.date == getCurrentDate()) {
                    setRounds(dataResponse.rounds)
                }
                setConfigTime(dataResponse.configTime ? dataResponse.configTime : 40)
                setBreakTime(dataResponse.configBreak ? dataResponse.configBreak : 5)
            }
        }
    }, [data])


    useEffect(() => {
        if (!start) {
            setReferenceTime(configTime)
            setTime(0)
        }
    }, [configTime])

    useEffect(() => {
        if (!startBreak) {
            setReferenceTime(configTime)
            setTime(0)
        }
    }, [breakTime])

    useEffect(() => {
        if (data?.slug) {
            updateTimeOnServer({})
        }
    }, [configTime, breakTime])

    /*
        Start time useEffect hook
    */
    useEffect(() => {
        const current = new Date().getTime()
        if (start) {
            var interval = setInterval(function () {
                const value = ((current - startTime) / 1000).toFixed(0)
                if ((referenceTime - parseInt(value)) <= 0) {
                    bellAudio.play()
                    setStart(false)
                    setFinished(true)
                    setTime(value);
                    clearInterval(interval)
                    setIsBreak(true)
                    setMinimized(false)
                    updateTimeOnServer({ rounds: rounds + 1 })
                    setRounds(rounds + 1)
                    toast.success('Pomodoro finished')
                    setDate(getCurrentDate())
                } else {
                    setTime(value);
                }
            }, 1000);
            return () => clearInterval(interval)
        }
    }, [time, start])

    useEffect(() => {
        if (startBreak) {
            const interval = setInterval(() => {
                const value = ((new Date().getTime() - startTime) / 1000).toFixed(0)
                setTime(value)
                console.log('Break time', breakTime - time)
                if (breakTime - time <= 1) {
                    bellAudio.play()
                    setIsBreak(false)
                    setReferenceTime(configTime)
                    setStart(false)
                    setFinished(false)
                    setStartBreak(false)
                    setTime(0)
                }

            }, 1000)

            return () => clearInterval(interval)
        }
    }, [time, isBreak])


    /*
        Auxiliar functions
    */

    interface UpdateTimeProperties {
        rounds?: number;
    }

    const updateTimeOnServer = async (optional: UpdateTimeProperties) => {
        const aux = {
            time: {
                configTime: configTime,
                configBreak: breakTime,
                date: getCurrentDate(),
                rounds: optional.rounds ? optional.rounds : rounds
            }
        }
        console.log('Aux', aux)

        await onUpdateTime({ slug: data.slug, body: aux })
    }


    /*
        Handler functions
    */

    const handleStart = () => {
        pressAudio.play()
        setTimeStart(new Date().getTime() - 500)
        setStart(true)
        setMinimized(el => !el)
    }


    const handleStartBreak = () => {
        pressAudio.play()
        setStart(true)
        setTimeStart(new Date().getTime() - 200)
        setTime(0)
        setReferenceTime(breakTime)
        setStartBreak(true)
    }

    const handleStop = () => {
        setTime(0)
        setStart(false)
        setStartBreak(false)
        setReferenceTime(configTime)
    }


    const handlePause = () => {
        setStart(false)
        setPause(true)
    }

    const handleStarPause = () => {
        setTimeStart(new Date().getTime() - 500)
        console.log('Pause start', referenceTime - time)
        setReferenceTime(referenceTime - time)
        setTime(0)
        setStart(true)
    }

    const handleSkipBreak = () => {
        setReferenceTime(configTime)
        setTimeStart(new Date().getTime() - 500)
        setStart(false)
        setTime(0)
        setFinished(false)
        setIsBreak(false)
        setStartBreak(false)
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
                    {
                        !startBreak && (
                            <div className="cursor-pointer gap-1 rounded flex items-center bg-zinc-200/90 py-1 px-3 text-sm"
                                onClick={handleStartBreak}>
                                <SmallPlayIcon size={"1.2rem"} />
                                <span className='text-sm capitalize'>
                                    Break time
                                </span>
                            </div>
                        )
                    }
                    <span className='mt-1 text-xs capitalize flex mb-auto'>
                        <div className="flex items-center gap-1 cursor-pointer mx-auto text-muted-foreground"
                            onClick={() => {
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
                <div className="flex items-center gap-1">
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
                    if (pause) {
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
                <div className='mr-2' onClick={() => setOpen(e => !e)}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Timer />
                            </TooltipTrigger>
                            <TooltipContent side='bottom' className='mt-4 z-[9999999]'>
                                <p>Timer</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
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
                                    convertSecondsToMinutes((referenceTime - time))
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
                            <div className="absolute top-24 right-0 rounded-sm w-[21rem] h-40 p-4 pt-0 bg-white border flex flex-col justify-between z-10">
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
                                        <div className="cursor-pointer flex items-center">
                                            <PomodoroSettingsPopover />
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
                                <div className="flex text-sm text-silver-500 font-medium justify-end text-zinc-500">
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
                        Do you want to close the pomodoro? The time will be reseted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="submit" onClick={handleClose}>Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const TIME = [
    { name: '25', value: '1500' },
    { name: '30', value: '1800' },
    { name: '35', value: '2100' },
    { name: '40', value: '2400' },
    { name: '45', value: '2700' },
    { name: '50', value: '3000' },
    { name: '55', value: '3300' },
    { name: '60', value: '3600' },
    { name: '90', value: '5400' },
]

const BREAL_TIME = [
    { name: '5', value: '300' },
    { name: '10', value: '600' },
    { name: '15', value: '900' },
    { name: '25', value: '1500' },
    { name: '30', value: '1800' },
    { name: '45', value: '2700' },
    { name: '60', value: '3600' },
]


const PomodoroSettingsPopover = () => {
    const [configTime, setConfigTime] = useState<any>(20)
    const [position, setPosition] = useState<any>("bottom")

    return (
        <Popover>
            <PopoverTrigger>
                <MoreVertical width={19} />
            </PopoverTrigger>
            <PopoverContent className='backdrop-blur-md bg-white/80'>
                <h4 className="font-medium text-base leading-none">Timer Settings</h4>
                <p className="text-muted-foreground text-sm mt-2">
                    Change the basic settings of your board.
                </p>
                <div className="grid gap-2 mt-4">
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="width">Time (min)</Label>
                        <TimeSettingsBox />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="width">Break (min)</Label>
                        <BrakeSettingsBox />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

const TimeSettingsBox = () => {
    //const [configTime, setConfigTime] = useState(20)
    const [customizedTime, setCustomizedTime] = useState<any>(false)
    const [configTime, setConfigTime] = useAtom(configTimeAtom);
    const [open, setOpen] = useState(false)

    //console.log('Count Atom', count)

    return (
        <Popover open={open} onOpenChange={el => setOpen(el)}>
            <PopoverTrigger>
                <div className="border rounded">
                    {configTime / 60}
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-52' align='end'>
                <Command>
                    <CommandGroup>
                        {
                            TIME.map((el, index) => {
                                return (
                                    <CommandItem
                                        key={index}
                                        value={el.value}
                                        onSelect={(value) => {
                                            setConfigTime(parseInt(value))
                                            setOpen(false)
                                        }}
                                    >
                                        {el.name}
                                    </CommandItem>
                                )
                            })
                        }


                    </CommandGroup>
                    <div className="">
                        {
                            customizedTime ? (
                                <Input
                                    type='number'
                                    id="width"
                                    defaultValue="100"
                                    className="col-span-2 h-8"
                                    min={1}
                                    value={configTime / 60}
                                    onChange={(e) => setConfigTime(parseInt(e.target.value) * 60)}
                                />
                            ) : <div onClick={() => setCustomizedTime(true)}>Custome time</div>
                        }
                    </div>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


const BrakeSettingsBox = ({ }: {}) => {
    //const [configTime, setConfigTime] = useState<any>(20)
    const [customizedTime, setCustomizedTime] = useState<any>(false)
    const [breakTime, setBreakTime] = useAtom(breakTimeAtom);
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={el => setOpen(el)}>
            <PopoverTrigger>
                <div className="border rounded">
                    {breakTime / 60}
                </div>
            </PopoverTrigger>
            <PopoverContent className='w-52' align='end'>
                <Command>
                    <CommandGroup>
                        {
                            BREAL_TIME.map((el, index) => {
                                return (
                                    <CommandItem
                                        key={index}
                                        value={el.value}
                                        onSelect={(value) => {
                                            setBreakTime(parseInt(value))
                                            setOpen(false)
                                        }
                                        }
                                    >
                                        {el.name}
                                    </CommandItem>
                                )
                            })
                        }


                    </CommandGroup>
                    <div className="">
                        {
                            customizedTime ? (
                                <Input
                                    type='number'
                                    id="width"
                                    defaultValue="100"
                                    className="col-span-2 h-8"
                                    min={1}
                                    value={breakTime / 60}
                                    onChange={(e) => setBreakTime(parseInt(e.target.value) * 60)}
                                />
                            ) : <div onClick={() => setCustomizedTime(true)}>Custome time</div>
                        }
                    </div>
                </Command>
            </PopoverContent>
        </Popover>
    )
}