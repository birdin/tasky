'use client'
import { userAtom } from '@/store'
import { useAtomValue } from 'jotai'
import React from 'react'

type Props = {}

const GreetingMessage = (props: Props) => {
    const sessionUser = useAtomValue(userAtom)
    return (
        <h1 className="text-2xl md:text-3xl font-semibold">
            Good evening{`${sessionUser.user?.name && " " + sessionUser.user?.name}`}!
        </h1>)
}

export default GreetingMessage