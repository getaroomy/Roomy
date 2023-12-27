import { useState } from "react";
import { ProfileExperience } from "@/app/lib/exports";
import {addExperienceWithUser} from "@/app/actions";
import { User } from "firebase/auth";

interface PostExperienceProps {
    posterUser: User | null
    uid?: string,
}

export default function PostExperience({ posterUser, uid }: PostExperienceProps) {
    const [date, setDate] = useState<string>("");
    const [experience, setExperience] = useState<string>("");

    const uploadExperience = () => {
        if (posterUser && uid && date && experience){
            const profileExp: ProfileExperience = {
                uid: posterUser.uid,
                experience: experience,
                date: date
            }
            addExperienceWithUser(posterUser, profileExp, uid)
        } else {
            console.log("Experience missing details!");
        }
    }

    return (
        <div className="border-2 border-dashed rounded-md">
            <div className="mx-1 my-1">
            <h1 className="text-lg font-semibold">Have you lived with them?</h1>
            <>
                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                <input type="text" value={date} onChange={(e)=>setDate(e.currentTarget.value)} id="date" placeholder="MM/YY - MM/YY"
                    className="block sm:w-full lg:w-1/6 rounded-md border-0 py-1.5
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </>
            <>
                <label htmlFor="experience" className="block text-sm font-medium leading-6 text-gray-900">Experience</label>
                <textarea placeholder="Hey" id="experience" value={experience} onChange={(e)=>setExperience(e.currentTarget.value)}
                    className="block sm:w-full lg:w-1/2 rounded-md border-0 py-1.5
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                    placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </>
            <button
                onClick={uploadExperience}
                className="bg-purple-200 hover:bg-purple-400 rounded-md my-2 p-1">
                    Submit
            </button>
            </div>
        </div>
    )
}
