'use client'
import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import GoogleIcon from '@/assets/google.svg'

import { GeneralLoader } from '@/components/loaders'


export default function HomePage() {
  const { data: session, status } = useSession()
  console.log('Status - Session:', { session, status })

  if (status === "authenticated") {
    redirect("/boards");
  }


  if (status === "loading") {
    return (
      <h1>  <GeneralLoader />  </h1>
    )
  }


  return (
    <Suspense fallback={<h1>🎻 Loading 🎻</h1>}>
      <div className="max-w-lg mx-auto mt-5 md:mt-10 px-4 sm:px-6 md:px-8">
        <h2 className='text-center text-4xl md:text-5xl font-medium'>Get started!</h2>
        <div className="text-center">
          <p>Log in to your account</p>
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
          <p className='mt-2'>If you already have an account, <a href='/login' className='text-[--main-color]'>sign in here</a></p>
        </div>
      </div>
    </Suspense>
  )
}
