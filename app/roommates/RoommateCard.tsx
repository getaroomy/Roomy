import React from 'react';
import Image from 'next/image';
import { RoommatePreviewDetails } from '../lib/exports';
import Link from 'next/link';
import UserProfileLogo from "@/public/user-profile-logo.svg";

export default function RoommateCard(
  {uid, displayName, bio, photoURL, city}:RoommatePreviewDetails) {
  return (
    <div
      className="border bg-gray-100 p-6 w-[300px] rounded-lg shadow-lg"
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center space-x-4">
          <span className="flex shrink-0 overflow-hidden rounded-full">
            <Image
              src={photoURL || UserProfileLogo}
              className="flex items-center justify-center rounded-full"
              width={64} height={64}
              alt={"Users Picture"} />
          </span>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{displayName}</h2>
            <p className="text-sm text-gray-500"></p> {/* */}
          </div>
        </div>
      </div>
      <div className="p-6 py-4 border-y">
        <p className="text-sm">
          {bio}
        </p>
      </div>
      <div className="flex items-center p-6 bg-gray-200 py-4 rounded-md">
        <div className="flex justify-between items-center">
          <div className="inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 mr-1"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {city}
          </div>
          <Link 
            href={`/profile/${uid}`}
            className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-purple-600 h-9 rounded-md px-3 bg-purple-400 text-white">
            Contact
          </Link>
        </div>
      </div>
    </div>
  )
}
