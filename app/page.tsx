"use client";
import { useEffect } from "react"
import { UserAuth } from "./context/AuthContext"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {user, loading} = UserAuth();
  console.log(user);
  useEffect(()=>{
    if (!user && !loading) router.push("/auth");
  },[loading, router, user]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>You&rsquo;re on: app/page</h1>
    </main>
  )
}
