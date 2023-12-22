"use client"

import React from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useInput } from '@/hooks/useInput'
import { CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const projects = [
    { id: uuidv4(), title: 'Hello wsssorld', image: 'https://i0.wp.com/artefeed.com/wp-content/uploads/2019/08/Animales-acu%C3%A1ticos-Pinturas-surrealistas-de-Lisa-Ericson-1-1.jpg?fit=853%2C1024&ssl=1' },
    { id: uuidv4(), title: 'Hello wor444ld', image: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/891debd34b8a4dbc72e2d3474ca4e74b/photo-1515165562839-978bbcf18277.jpg' },
    { id: uuidv4(), title: 'Hello world', image: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/575482d12c48436ad3aa5cccdb82f138/photo-1448375240586-882707db888b.jpg' },
    { id: uuidv4(), title: 'Hello wovvvrld', image: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/575482d12c48436ad3aa5cccdb82f138/photo-1448375240586-882707db888b.jpg' },
]

const ProjectLists = () => {
    const inputSearch = useInput('')

    const { data: session } = useSession()
    return (
        <>
            <div className='flex justify-between'>
                <h2 className='font-semibold text-lg md:text-xl flex items-center gap-1'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z" fill="black" />
                    </svg>
                    Projects
                </h2>
                <div className="">
                    {
                        // Create button
                    }
                    <DialogDemo />
                </div>
            </div>
            <div className="flex gap-4 text-sm mt-2 flex-wrap">
                <div className="text-gray-500 flex items-center gap-2 cursor-pointer order-last md:order-first">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="none"
                        viewBox="0 0 17 17"
                    >
                        <path
                            fill="#919191"
                            d="M9.917 8.5v5.582a.68.68 0 01-.206.588.707.707 0 01-.998 0l-1.424-1.424a.7.7 0 01-.206-.588V8.5h-.02l-4.08-5.228a.708.708 0 01.12-.991.738.738 0 01.439-.156h9.916c.156 0 .305.057.44.156a.709.709 0 01.12.991L9.938 8.5h-.021z"
                        ></path>
                    </svg>
                    Last opened
                </div>
                <div className="flex items-center bg-gray-100/50 border rounded-sm gap-2 py-[6px] px-2 w-full md:w-64">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            fill="none"
                            viewBox="0 0 18 18"
                        >
                            <path
                                fill="#888"
                                d="M16.6 18l-6.3-6.3A6.096 6.096 0 016.5 13c-1.817 0-3.354-.63-4.612-1.888C.63 9.853.001 8.316 0 6.5c0-1.817.63-3.354 1.888-4.612C3.147.63 4.684.001 6.5 0c1.817 0 3.354.63 4.613 1.888C12.372 3.147 13.001 4.684 13 6.5a6.096 6.096 0 01-1.3 3.8l6.3 6.3-1.4 1.4zM6.5 11c1.25 0 2.313-.437 3.188-1.312S11.001 7.751 11 6.5c0-1.25-.437-2.312-1.312-3.187S7.751 2.001 6.5 2c-1.25 0-2.312.438-3.187 1.313S2.001 5.251 2 6.5c0 1.25.438 2.313 1.313 3.188S5.251 11.001 6.5 11z"
                            ></path>
                        </svg>
                    </div>
                    <input type="text" className='bg-transparent outline-0 w-screen' placeholder='Search project…' {...inputSearch} />
                </div>
            </div>

            <section className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                {
                    projects.filter(el => el.title.indexOf(inputSearch.value) != -1).map(project => (
                        <Card key={project.id} title={project.title} image={project.image} id={project.id} />
                    ))
                }
            </section>
        </>
    )
}


const Card = ({ title, image, id }: { title: string, image: string, id: string }) => {
    return (
        <div className="h-32 relative overflow-hidden">
            <Link href={`boards/${id}`} className=' block'>
                <div className="">
                    <img className='w-full object-cover' src={image} />
                </div>
                <div className="bg-gradient-to-t from-stone-900 w-full absolute bottom-0 z-2 text-white font-medium text-base px-2 py-2">
                    <h3 className=''>{title}</h3>
                </div>
            </Link>
        </div>
    )
}

function DialogDemo() {
    return (
        <Dialog>
            <DialogTrigger className="bg-gray-100/80 font-medium rounded-md px-4 py-2 text-sm text-gray-500">
                + Create new project
            </DialogTrigger>
            <DialogContent className='py-7'>
                <CreateBoardForm />
                <form action="">
                    <Button type="submit" variant="outline" onClick={() => DialogClose} className="w-full">
                        Create new board
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}


const CreateBoardForm = () => {
    return (
        <>
            <div className="">
                <CardTitle className='mb-1 text-[23px]'>Create a new project / board</CardTitle>
                <CardDescription className='text-sm'>
                    Define a new board and its elements.
                </CardDescription>
            </div>
            <div className="grid gap-2 mt-1">
                <Label htmlFor="name" className="font-semibold text-[15px]">What’s the name of the board?</Label>
                <Input id="name" placeholder="First Last" className='hover:outline-none' />
            </div>
            <div className="grid gap-1">
                <Label htmlFor="name" className="font-semibold text-[15px]">Select your template</Label>
                <CardDescription className='text-sm mb-1'>
                    Define a new board and its elements.
                </CardDescription>
                <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                    <div>
                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                        <Label
                            htmlFor="card"
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
                            value="paypal"
                            id="paypal"
                            className="peer sr-only"
                        />
                        <Label
                            htmlFor="paypal"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4ZM16 19H20V5H16V19ZM14 5H10V19H14V5ZM4 5V19H8V5H4Z" fill="#454545" />
                            </svg>

                            Kanban
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
                        <Label
                            htmlFor="apple"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 19H22M22 19L19.5 16.5M22 19L19.5 21.5M12 2L9.5 4.5L12 7" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.5 4.5C12.4891 4.5 14.3968 5.29018 15.8033 6.6967C17.2098 8.10322 18 10.0109 18 12C18 13.9891 17.2098 15.8968 15.8033 17.3033C14.3968 18.7098 12.4891 19.5 10.5 19.5H2" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6.756 5.5C5.61383 6.15768 4.66522 7.10484 4.0058 8.246C3.34638 9.38717 2.99946 10.682 3 12C3 13.688 3.558 15.246 4.5 16.5" stroke="#454545" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            Agile
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="grid gap-1 mt-1">
                <Label htmlFor="name" className="font-semibold text-[15px]">Select the background</Label>
                <CardDescription className='text-sm mb-2'>
                    Select the type of template to start the board.
                </CardDescription>

                <RadioGroup defaultValue="default" className="grid grid-cols-4 gap-1  bg-stone-50 underline-offset-2">
                    <div className="">
                        <RadioGroupItem value="default" id="default" className="peer sr-only" />
                        <Label
                            htmlFor="default"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                        >
                            <div className="h-16 w-full bg-blue-200 rounded overflow-hidden"></div>
                        </Label>
                    </div>
                    <div className="">
                        <RadioGroupItem value="yellow" id="yellow" className="peer sr-only" />
                        <Label
                            htmlFor="yellow"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                        >
                            <div className="h-16 w-full bg-yellow-200 rounded overflow-hidden"></div>
                        </Label>
                    </div>
                    <div className="">
                        <RadioGroupItem value="bg-1" id="bg-1" className="peer sr-only" />
                        <Label
                            htmlFor="bg-1"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                        >
                            <div className="h-16 w-full bg-blue-200 rounded overflow-hidden">
                                <img className='bg-cover bg-center rounded' src="https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            </div>
                        </Label>
                    </div>
                    <div className="">
                        <RadioGroupItem value="bg-2" id="bg-2" className="peer sr-only" />
                        <Label
                            htmlFor="bg-2"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500"
                        >
                            <div className="h-16 w-full bg-blue-200 rounded overflow-hidden">
                                <img className='bg-cover bg-center rounded' src="https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D" alt="" />
                            </div>
                        </Label>
                    </div>
                </RadioGroup>
                <div className="grid gap-1 mt-3">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="performance" className="flex flex-col space-y-1">
                            <span>Performance Cookies</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                These cookies help to improve the performance.
                            </span>
                        </Label>
                        <Switch id="performance" />
                    </div>
                </div>
                <div className="mt-2">

                </div>
            </div>


        </>
    )
}

export default ProjectLists