"use client"

import React from 'react'
import { useSession } from "next-auth/react"

const ProjectLists = () => {
    const { data: session } = useSession()
    console.log(session)
    
    return (
        <div>ProjectLists</div>
    )
}
   
export default ProjectLists