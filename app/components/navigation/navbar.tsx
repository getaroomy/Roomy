import Link from "next/link"
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import ProfileDefaultLogo from "@/public/profile-default.svg";

export const Navbar = (
  { toggle, logOut, uid }:
  { toggle: () => void, logOut: () => void, uid: string | undefined }
) => {
  const [profileDropdown, showProfileDropdown] = useState<boolean>(false);

  const signOutUser = () => {
    logOut();
    showProfileDropdown(!profileDropdown);
  }

  const DropdownComponent = () => {
    return (
      <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
        <div className="py-1" onClick={()=>showProfileDropdown(!profileDropdown)}>
          <Link href={`/profile/${uid}`} className="text-gray-700 block px-4 py-2 text-md">My Profile</Link>
        </div>
        <div className="py-1" onClick={signOutUser}>
          <div className="text-gray-700 block px-4 py-2 text-md">Sign Out</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-900 h-20 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Link href="/">
            {/* Replace with image eventually */}
            <h1 className="md:flex gap-x-6 text-white hover:text-violet-400 text-lg ">Homepage</h1>
          </Link>
          <button
            type="button"
            className="inline-flex items-center md:hidden"
            onClick={toggle}
          >
            {/* Burger button on smaller screens */}
            <Bars3Icon height={40} width={40} color="white"/>
          </button>
          <Link href="/roommates" className="hidden md:flex gap-x-6 text-white text-lg">
            <p className="hover:text-violet-400">Roommates</p>
          </Link>
          <Link href="/rentals" className="hidden md:flex gap-x-6 text-white text-lg">
            <p className="hover:text-violet-400">Rentals</p>
          </Link>
          <div className="relative text-left hidden md:block">
            <Image onBlur={()=>showProfileDropdown(!profileDropdown)} onClick={() => showProfileDropdown(!profileDropdown)} height={64} width={64} className="text-white hover:text-violet-400" src={ProfileDefaultLogo} alt="Profile Picture"/>
            {profileDropdown ? <DropdownComponent /> : null }
          </div>
        </div>
      </div>
    </div>
  );
};
