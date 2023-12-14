"use client";
import { UserAuth } from "@/app/context/AuthContext"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getOtherUser } from "@/app/actions";
import { UserProfileDetails } from "@/app/lib/exports";
import Image from "next/image";
import UserProfileLogo from "@/public/user-profile-logo.svg";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import ExperienceCard from "./ExperienceCard";
import Link from "next/link";

export default function Page({ params }: { params: { uid: string } }) {
    const router = useRouter();
    const {user, loading} = UserAuth();
    const [currentUser, setCurrentUser] = useState<UserProfileDetails | null>();


    useEffect(()=>{
		if (!user && !loading) router.push("/auth");
		if (user){
			const getCurrentUserData = async () => {
				const userDetails = await getOtherUser(user, params.uid);
				setCurrentUser(userDetails);
			}
			getCurrentUserData();
		}
	},[loading, params.uid, router, user]);

	const experiencesList = currentUser?.experiences || [];

    return (
        <main className="grid-cols-1 px-24 py-12 sm:grid-cols-6">
            {/* Header */}
			<div id="header" className="pb-8 items-center col-span-full mt-2 border-dotted border-b-2">
				<div className="md:columns-6 sm:columns-1">
					<Image id="profilePicture" src={currentUser?.photoURL || UserProfileLogo} alt="Profile picture" height={128} width={128} className="rounded-full"/>
					{currentUser?.uid === user?.uid &&
						<Link href={`/profile/${user?.uid}/edit`} className="bg-purple-200 rounded-md m-4 px-8 py-4 text-center inline-flex items-center hover:bg-black">Edit Profile</Link>
					}
				</div>
				<h1 id="displayName" className="mt-2 text-2xl font-bold">{currentUser?.displayName  || "Display Name"}</h1>
				<h2 id="bio" className="mt-2 text-xl">{currentUser?.bio || "This is my bio"}</h2>
				<div id="contactInfo" className="mt-1">
					<div id="phone" className="flex">
						<PhoneIcon height={24} width={24} className="text-purple-500" />
						<p className="font-bold">
							Phone Number:
						</p>
						{ currentUser?.showPhoneNumber ?
							<a href={`tel:${currentUser?.phoneNumber}`}>{currentUser?.phoneNumber}</a>
						: "***-***-****" }
					</div>
					<div id="email" className="flex">
						<EnvelopeIcon height={24} width={24} className="text-purple-500" />
						<p className="font-bold">
							Email:
						</p>
						{currentUser?.email}
					</div>
				</div>
			</div>
			<div id="preferences" className="pb-8 col-span-full mt-2 border-dotted border-b-2">
				<h1 className="mt-2 text-2xl font-bold">Preferences</h1>
				<div id="preferencesInfo" className="mt-1">
					<div id="genderPreference">
						<p className="font-bold">
							Gender Preference:
						</p>
						{currentUser?.preferences?.roomWithGender}
					</div>
					<div className="md:columns-2 sm:columns-1 pb-4">
						<div id="doTheyHavePets">
							<p className="font-bold">
								Do they have pets?
							</p>
							{currentUser?.preferences?.doIHavePets ? "Yes" : "No"}
						</div>
						<div id="fineWithHavingPets">
							<p className="font-bold">
								Are they fine with having pets?
							</p>
							{currentUser?.preferences?.fineWithHavingPets ? "Yes" : "No"}
						</div>
					</div>
					<div className="md:columns-2 sm:columns-1 pb-4">
						<div id="doTheySmoke">
							<p className="font-bold">
								Do they smoke?
							</p>
							{currentUser?.preferences?.doISmoke ? "Yes" : "No"}
						</div>
						<div id="fineWithSmokers">
							<p className="font-bold">
								Are they fine with you smoking?
							</p>
							{currentUser?.preferences?.fineWithSmokers ? "Yes" : "No"}
						</div>
					</div>
				</div>
			</div>
			<div id="experiences" className="pb-8 items-center col-span-full mt-2">
				<h1 className="mt-2 text-2xl font-bold">Experiences</h1>
				<ul>
					{
						experiencesList.map((exp, index)=>{
							return (<li key={index}>
								<ExperienceCard
									uid={exp.uid}
									photoURL={exp.photoURL}
									displayName={exp.displayName}
									date={exp.date}
									experience={exp.experience}					
								/>
							</li>)
						})
					}
				</ul>
			</div>
        </main>
    )
}