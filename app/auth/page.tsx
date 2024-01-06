"use client";
import {useState} from "react"
import SignIn from "./signin"
import SignUp from "./signup"
import { UserAuth } from "../context/AuthContext"
import { useRouter } from "next/navigation";

export default function Auth() {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(true);
  const {user, loading, emailSignIn, emailCreateAccount, googleSignIn} = UserAuth();
  const router = useRouter();

  const emailSigninAuth = async (email: string, password: string) => {
    const signedInEmail = await emailSignIn(email, password);
    if(signedInEmail) router.push("/");
  }

  const emailCreateAccountAuth = async (email:string, password:string, fullName:string, gender:string) => {
    const createdEmail = await emailCreateAccount(email, password, fullName, gender);
    if(createdEmail) router.push("/");
  }

  const googleAuth = async () => {
    const signedInGoogle = await googleSignIn();
    if(signedInGoogle) router.push("/");
  }



  return (
    <main className="flex min-h-screen flex-col items-center py-8">
        <h1>Auth</h1>
        <div className="flex flex-row py-8">
            <h1 className={`px-8`} onClick={()=>setIsSigningIn(true)}>Sign In</h1>
            <h1 className={`px-8`} onClick={()=>setIsSigningIn(false)}>Sign Up</h1>
        </div>
        {isSigningIn ?
        <SignIn
          emailSigninAuth={emailSigninAuth}
          googleAuth={googleAuth}/> :
        <SignUp
          emailCreateAccountAuth={emailCreateAccountAuth}
          googleAuth={googleAuth}/>
        }
    </main>
  )
}
