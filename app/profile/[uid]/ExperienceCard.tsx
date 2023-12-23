import Image from "next/image";
import Link from "next/link";
import { ProfileExperience } from "@/app/lib/exports";
import UserProfileLogo from "@/public/user-profile-logo.svg";

export default function ExperienceCard(
    { uid, photoURL, displayName, date, experience }:
    ProfileExperience
){
    return (
        <>
            <div className="flex gap-4 pt-4">
                <Link href={`/profile/${uid}`} className="relative flex shrink-0 overflow-hidden rounded-full w-10 h-10 border">
                    <Image className="aspect-square h-full w-full" height={32} width={32} alt="reviewers profile picture" src={photoURL || UserProfileLogo} />
                </Link>
                <div className="grid gap-4">
                    <div className="flex gap-4 items-start">
                        <div className="grid gap-0.5 text-sm">
                            <h3 className="font-semibold">{displayName}</h3>
                            <h3 className="text-sm text-gray-500">{date}</h3>
                        </div>
                    </div>
                    <div className="text-sm leading-loose text-gray-500">
                        <p>{experience}</p>
                    </div>
                </div>
            </div>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-100 h-[1px] w-full"></div>
        </>
    );
}