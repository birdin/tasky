"use client"

import React, { useEffect, useState } from 'react'

type Props = {

}

export const Pomodoro = () => {
    const [time, setTime] = useState(new Date().getTime())

    useEffect(() => {
        const current = new Date().getTime()
        const diff = current - time;
        //console.log(diff)
        const interval = setInterval(() => {
            setTime(time + 1)
            //console.log(time)
        }, 1000);
        return () => clearInterval(interval)
    }, [time])

    return (
        <div>
            <h1 className='font-bold'>hola</h1>
            <p>{
            /*time
            */}</p>
        </div>
    )
}

