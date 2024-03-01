'use client'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import { Suspense } from 'react';

import GoogleIcon from '@/assets/google.svg'

import { GeneralLoader } from '@/components/loaders'

export default function HomePage() {
  const { data: session, status } = useSession()
  console.log({ session, status })


  if (status === "authenticated") {
    redirect("/boards");
  }

  if (status === "loading") {
    return (
      <GeneralLoader />
    )
  }



  return (
    <Suspense fallback={<GeneralLoader />}>
      <div className="max-w-lg mx-auto mt-5 md:mt-10 px-4 sm:px-6 md:px-8">
        <h2 className='text-center text-4xl md:text-5xl font-medium'>Log in</h2>
        <div className="text-center">
          <p>Sign in to your account</p>
        </div>
        <div className="mt-5 mx-auto">
          <button
            className='bg-slate-200/80	rounded-md p-3 w-full text-center text-sm flex items-center justify-center gap-2'
            onClick={() => {
              signIn("google");
            }}>
            <img src={GoogleIcon.src} className='w-4' alt="" />
            Log in  with google</button>
          <p className="text-center my-2">
            –– or ––
          </p>
          <form className="flex flex-col mt-4 gap-2">
            <label htmlFor="email">Email</label>
            <input type="email" className='border p-1' name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" className='border p-1' name="password" id="password" />
            <button
              type="submit"
              className='bg-gray-500 text-white rounded-md p-3 w-full text-center text-sm'
            >Sign in</button>
          </form>
          <p className='mt-2'>{"If you don't have an account,"} <a href='/signup' className='text-[--main-color]'>sign up here</a></p>
        </div>
      </div>
    </Suspense>
  )
}

