"use client"

import { atom, useAtom } from 'jotai';

export const configTimeAtom = atom(30*60);
export const breakTimeAtom = atom(5*60);
export const referenceTimeAtom = atom(30*60);

