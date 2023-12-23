"use client"

import React from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';

import { useInput } from '@/hooks/useInput'

import {CreateProjectForm} from './CreatProjectForm'

const projectsAux = [
    { id: uuidv4(), title: 'Hello wsssorld', image: 'https://i0.wp.com/artefeed.com/wp-content/uploads/2019/08/Animales-acu%C3%A1ticos-Pinturas-surrealistas-de-Lisa-Ericson-1-1.jpg?fit=853%2C1024&ssl=1' },
    { id: uuidv4(), title: 'Hello wor444ld', image: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/891debd34b8a4dbc72e2d3474ca4e74b/photo-1515165562839-978bbcf18277.jpg' },
    { id: uuidv4(), title: 'Hello world', image: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/575482d12c48436ad3aa5cccdb82f138/photo-1448375240586-882707db888b.jpg' },
    { id: uuidv4(), title: 'Hello wovvvrld', image: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/575482d12c48436ad3aa5cccdb82f138/photo-1448375240586-882707db888b.jpg' },
]

const ProjectLists = () => {
    const inputSearch = useInput('')
    const [projects, setProjects] = React.useState(projectsAux)

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
                    <CreateProjectForm />
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



export default ProjectLists