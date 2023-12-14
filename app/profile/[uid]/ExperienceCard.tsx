import Image from "next/image";
import Link from "next/link";
import { ProfileExperience } from "@/app/lib/exports";

export default function ExperienceCard(
    { uid, photoURL, displayName, date, experience }:
    ProfileExperience
){
    return (
        <div className="bg-amber-200">
            <Link href={`/profile/${uid}`}>
                <Image src={photoURL || ""} alt={`${displayName}'s profile picture`} className=" rounded-full" height={32} width={32}/>
            </Link>
            <h2>{displayName}</h2>
            <h3>{experience}</h3>
            <h3>{date}</h3>
        </div>
    );
}