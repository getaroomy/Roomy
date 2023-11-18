"use client";
import Link from "next/link"
import { UserAuth } from "../context/AuthContext"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const {user, loading} = UserAuth();

  useEffect(()=>{
    if (!user && !loading) router.push("/auth");
  },[loading, router, user]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-lg">Profile</h1>
        {user?.displayName}
    </main>
  )
}
