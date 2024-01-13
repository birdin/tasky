"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { CardDescription, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

import { useForm, SubmitHandler, set } from "react-hook-form"
import React, { useEffect } from "react";
import { getCookie } from "cookies-next";

import {useGetBackgrounds} from '@/hooks/useGetBackgrounds'

type Inputs = {
    title: string;
    visibility: boolean;
}

export const CreateProjectForm = ({ setProjects }: { setProjects: any }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const [visibility, setVisibility] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [theme, setTheme] = React.useState(1)
    const [template, setTemplate] = React.useState('default')
    const [open, setOpen] = React.useState(false)
    const [error, setError] = React.useState(false)

    const cookie = getCookie("token_2sl");
    const backgerounds = useGetBackgrounds(cookie)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log({ title, theme, visibility })
        if (title === '') {
            setError(true)
        } else {
            setOpen(false)
            setError(false)
            setProjects({id:Date.now(), name: title, theme, template, isPrivate: !visibility, background_id: theme});
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-gray-100/80 font-medium rounded-md px-4 py-2 text-sm text-gray-500">
                + Create new project
            </DialogTrigger>
            <DialogContent className='py-7'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <CardTitle className='mb-1 text-[23px]'>Create a new project / board</CardTitle>
                        <CardDescription className='text-sm'>
                            Define a new board and its elements.
                        </CardDescription>
                    </div>
                    <div className="grid gap-2 mt-1">
                        <Label htmlFor="name" className="font-semibold text-[15px]">What’s the name of the board?</Label>
                        <Input id="title" placeholder="Project name" className='hover:outline-none' value={title} onChange={el => setTitle(el.target.value)} />
                    </div>
                    <div className="grid gap-1 mt-2">
                        <Label htmlFor="name" className="font-semibold text-[15px]">Select your template</Label>
                        <CardDescription className='text-sm mb-1'>
                            Define a new board and its elements.
                        </CardDescription>
                        <RadioGroup defaultValue={"default"} value={template} onValueChange={e => setTemplate(e)} className="grid grid-cols-3 gap-4">
                            <div>
                                <RadioGroupItem value="default" id="default" className="peer sr-only" />
                                <Label
                                    htmlFor="default"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                                >
                                    <svg width="22" height="22" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9741 7.73824L19.2618 3.02484C19.1051 2.8681 18.919 2.74377 18.7143 2.65894C18.5095 2.57411 18.29 2.53045 18.0684 2.53045C17.8467 2.53045 17.6273 2.57411 17.4225 2.65894C17.2178 2.74377 17.0317 2.8681 16.875 3.02484L3.86966 16.0313C3.71228 16.1874 3.5875 16.3732 3.50258 16.578C3.41767 16.7828 3.3743 17.0024 3.37501 17.2241V21.9375C3.37501 22.3851 3.5528 22.8143 3.86927 23.1307C4.18573 23.4472 4.61496 23.625 5.06251 23.625H9.77591C9.99759 23.6257 10.2172 23.5823 10.422 23.4974C10.6268 23.4125 10.8126 23.2877 10.9688 23.1304L23.9741 10.125C24.1308 9.9683 24.2552 9.78225 24.34 9.57749C24.4248 9.37273 24.4685 9.15326 24.4685 8.93162C24.4685 8.70998 24.4248 8.49052 24.34 8.28575C24.2552 8.08099 24.1308 7.89495 23.9741 7.73824ZM5.41161 16.875L14.3438 7.94285L16.104 9.70313L7.17188 18.6342L5.41161 16.875ZM5.06251 18.9116L8.08841 21.9375H5.06251V18.9116ZM10.125 21.5884L8.36473 19.8281L17.2969 10.896L19.0572 12.6563L10.125 21.5884ZM20.25 11.4634L15.5366 6.75L18.0679 4.21875L22.7813 8.93109L20.25 11.4634Z" fill="#454545" />
                                    </svg>

                                    Default
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem
                                    value="kanban"
                                    id="kanban"
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor="kanban"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                                >
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4ZM16 19H20V5H16V19ZM14 5H10V19H14V5ZM4 5V19H8V5H4Z" fill="#454545" />
                                    </svg>

                                    Kanban
                                </Label>
                            </div>
                            <div>
                                <RadioGroupItem value="agile" id="agile" className="peer sr-only" />
                                <Label
                                    htmlFor="agile"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="#454545"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M17.5 19H22m0 0l-2.5-2.5M22 19l-2.5 2.5M12 2L9.5 4.5 12 7"
                                        ></path>
                                        <path
                                            stroke="#454545"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M10.5 4.5a7.5 7.5 0 010 15H2"
                                        ></path>
                                        <path
                                            stroke="#454545"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M6.756 5.5A7.497 7.497 0 003 12c0 1.688.558 3.246 1.5 4.5"
                                        ></path>
                                    </svg>

                                    agile
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="grid gap-1 mt-2">
                        <Label htmlFor="name" className="font-semibold text-[15px]">Select the background</Label>
                        <CardDescription className='text-sm mb-2'>
                            Select the type of template to start the board.
                        </CardDescription>

                        <RadioGroup 
                            defaultValue="defaultBackground" 
                            className="grid grid-cols-4 gap-1  bg-stone-50 underline-offset-2"
                            onValueChange={ (el: any) => setTheme(el)}
                            >

                            {
                                backgerounds.loading === false ? backgerounds.backgrounds.map((el: any) => (
                                    <div key={`el-comp-${el.value}`} >
                                        <RadioGroupItem value={el.id} id={el.value} className="peer sr-only" />
                                        <Label
                                            htmlFor={el.value}
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                                        >
                                            <div className="h-16 w-full bg-blue-200 rounded overflow-hidden">
                                                <img className='bg-cover bg-center rounded' src={el.thumb} alt="" />
                                            </div>
                                        </Label>
                                    </div>
                                )) : <div>Loading...</div>
                            
                                }
                            
                        </RadioGroup>
                        <div className="grid gap-1 mt-3">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="performance" className="flex flex-col space-y-1">
                                    <span>Visibility options</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Would you like to make this board public?
                                    </span>
                                </Label>
                                <Switch id="visibility" checked={visibility} onCheckedChange={() => setVisibility(e => !e)} {...register('visibility')} />
                            </div>
                        </div>
                        <div className="mt-2">

                        </div>
                    </div>
                    <Button type="submit" variant="outline" className="w-full">
                        Create new board
                    </Button>
                    {error ? <p className="text-rose-600 text-sm font-medium mt-2">Error: we cant create the board.</p> : ''}
                </form>
            </DialogContent>
        </Dialog>
    )
}


const BackGroundRadioItem = ({ value, id, children }: { value: string, id: string, children?: any }) => {
    return (
        <div className="">
            <RadioGroupItem value={value} id={id} className="peer sr-only" />
            <Label
                htmlFor={id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
            >
                {children}
            </Label>
        </div>
    )
}

