"use client"

import { atom, useAtom } from 'jotai';

type User = {
    user : { name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; } | undefined
}

export const configTimeAtom = atom(30*60);
export const breakTimeAtom = atom(5*60);
export const referenceTimeAtom = atom(30*60);
export const userAtom = atom<User>({user:{name:'', email:'', image:''}});
