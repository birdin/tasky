"use client"

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';


type Props = {

}

function ReactPortal({ children, wrapperId }:{
    children: React.ReactNode,
    wrapperId: string
}) {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
  
    const element = document.getElementById(wrapperId)
    if(!element) {
        return null
    }

    return createPortal(children, element);
  }

export const Pomodoro = () => {
    const [time, setTime] = useState<any>(0)
    const [startTime, setTimeStart] = useState(new Date().getTime())
    const [start, setStart] = useState(false);

    useEffect(() => {
        const current = new Date().getTime()
        var interval = setInterval(function() {
            const value = ((current - startTime) / 1000).toFixed(0)
            setTime(value);
        }, 1000);
        return () => clearInterval(interval)
    }, [time])

    


    return (
        <>
            <div>
                <h1 className='font-bold'>hola</h1>
                <p>{
                /*time
            */}</p>
            </div>
            <ReactPortal wrapperId="portal">

                <div className="absolute bottom-0 w-20 h-16 bg-white">
                    {time}
                </div>
            </ReactPortal>
        </>
    )
}

