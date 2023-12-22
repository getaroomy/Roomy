"use client";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";

export default function Profile() {
	const router = useRouter();
	const {user, loading} = UserAuth();
	useEffect(()=>{
		if (!user && !loading) router.push("/auth");
		if (user){
			router.replace(`/profile/${user.uid}`);
		}
	},[loading, router, user]);
	return (
		<></>
	)
}
