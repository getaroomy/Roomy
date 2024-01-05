"use client";
import {useState, useEffect} from "react"
import SignIn from "./signin"
import SignUp from "./signup"
import { UserAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation";

export default function Auth() {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(true);
  const {user, loading} = UserAuth();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center py-8">
        <h1>Auth</h1>
        <div className="flex flex-row py-8">
            <h1 className={`px-8`} onClick={()=>setIsSigningIn(true)}>Sign In</h1>
            <h1 className={`px-8`} onClick={()=>setIsSigningIn(false)}>Sign Up</h1>
        </div>
        {isSigningIn ? <SignIn /> : <SignUp /> }
    </main>
  )
}
