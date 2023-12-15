"use client";
import { RoommatePreviewDetails } from "@/app/lib/exports";
import RoommateCard from "./RoommateCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {UserAuth} from "@/app/context/AuthContext";
import { getAvailableRoommates } from "@/app/actions";

export default function Roommates() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const {user, loading} = UserAuth();

  const [roommates,setRoommates] = useState<Array<RoommatePreviewDetails> | null>();

  useEffect(()=>{
		if (!user && !loading) router.push("/auth");
		if (user){
      const getRoommates = async () => {
        const res = await getAvailableRoommates(user, page);
        setRoommates(res);
      }
      getRoommates();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[loading, page, user]);

  return (
    <main className="py-12 px-8">
      <h1 className="flex justify-center text-2xl pb-4 font-bold italic">Find Roomies</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {roommates && roommates.map((person: RoommatePreviewDetails, index: number)=>{
          return (
              <RoommateCard
                key={index}
                uid={person.uid}
                displayName={person.displayName}
                bio={person.bio}
                photoURL={person.photoURL}
                city={person.city} />
          );
        })}
      </div>
    </main>
  )
}
