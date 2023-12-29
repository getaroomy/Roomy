"use client";
import { RoommatePreviewDetails } from "@/app/lib/exports";
import RoommateCard from "./RoommateCard";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {UserAuth} from "@/app/context/AuthContext";
import { getAvailableRoommates } from "@/app/actions";
import Spinner from "@/public/spinner.svg";
import Link from "next/link";
import Image from "next/image";

export default function Roommates() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const city = searchParams.get("city");
  const {user, loading} = UserAuth();

  const [roommates,setRoommates] = useState<Array<RoommatePreviewDetails> | null>();
  const [loadingRoommates, setLoadingRoommates] = useState(true);
  useEffect(()=>{
		if (!user && !loading) router.push("/auth");
		if (user){
      const getRoommates = async () => {
        setLoadingRoommates(true);
        const cityParam = city ? `&city=${city}` : "";
        const pageParam = page ? `&page=${page}` : "";
        const params = `${cityParam}${pageParam}`;
        const res = await getAvailableRoommates(user, params);
        setRoommates(res);
        setLoadingRoommates(false);
      }
      getRoommates();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[loading, page, user, city]);

  return (
    <main className="py-12 px-8">
      <h1 className="flex justify-center text-2xl pb-4 font-bold italic">Find Roomies</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {(roommates && roommates.length) ? roommates.map((person: RoommatePreviewDetails, index: number)=>{
          return (
              <RoommateCard
                key={index}
                uid={person.uid}
                displayName={person.displayName}
                bio={person.bio}
                photoURL={person.photoURL}
                city={person.city} />
          );
        }) : loadingRoommates ?
          <Image src={Spinner} alt={"loading spinner"} />
        :
        <div className="text-center">
            <h1>No Roomies found :( </h1>
            <h2>Check if your <Link className="text-purple-600" href={`/profile/${user?.uid}/edit`}>profile</Link> is updated</h2>
        </div>
        }
      </div>
    </main>
  )
}
