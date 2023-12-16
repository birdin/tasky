"use client";

import { signIn } from "next-auth/react";

export default function HomePage() {
  return (
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
  )
}