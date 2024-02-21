'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

import { signIn } from "next-auth/react";
import { Suspense } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession()
  console.log({ session, status })


  if (status === "authenticated") {
    redirect("/boards");
  }

  if (status === "loading") {
    return (
      <h1>🦌 Loading 🦌</h1>
    )
  }



  return (
    <Suspense fallback={<h1>🎻 Loading 🎻</h1>}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2>This is it</h2>
        <button onClick={() => {
          signIn("google");
        }}>Loggin with google</button>
        <form className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
          <button type="submit">Sign in</button>
        </form>
      </div>
    </Suspense>
  )
}

