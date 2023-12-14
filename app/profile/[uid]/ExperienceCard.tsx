import Image from "next/image";
import Link from "next/link";

export default function ExperienceCard(
    { uid, imageUrl, name, date, experience }:
    { uid: string, imageUrl: string, name: string, date: string, experience: string }
){
    return (
        <div className="bg-amber-200">
            <Link href={`/profile/${uid}`}>
                <Image src={imageUrl} alt={`${name}'s profile picture`} className=" rounded-full" height={32} width={32}/>
            </Link>
            <h2>{name}</h2>
            <h3>{experience}</h3>
            <h3>{date}</h3>
        </div>
    );
}