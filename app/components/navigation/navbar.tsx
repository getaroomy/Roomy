import Link from "next/link"
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import ProfileDefaultLogo from "@/public/profile-default.svg";
import RoomyLogo from "@/public/roomy-logo.png";
import Searchbar from "../searchbar";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const Navbar = (
  { toggle, logOut, uid }:
  { toggle: () => void, logOut: () => void, uid: string | undefined }
) => {
  const router = useRouter();
  let path = usePathname();
  const [profileDropdown, showProfileDropdown] = useState<boolean>(false);

  const signOutUser = () => {
    logOut();
    showProfileDropdown(!profileDropdown);
  }

  const DropdownComponent = () => {
    return (
      <div tabIndex={100} className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
        <div className="py-1" onClick={()=>showProfileDropdown(!profileDropdown)}>
          <Link href={`/profile/${uid}`} className="text-gray-700 block px-4 py-2 text-md">My Profile</Link>
        </div>
        <div className="py-1" onClick={signOutUser}>
          <div className="text-gray-700 block px-4 py-2 text-md">Sign Out</div>
        </div>
      </div>
    );
  }

  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      showProfileDropdown(false);
    }
  }

  const chooseLocation = (city: string) => {
    if(path === "/roommates") router.push(`/roommates?city=${city}`);
    else if(path === "/rentals") router.push(`/rentals?city=${city}`);
    else if(path === "/") router.push(`?city=${city}`);
  }

  return (
    <div className="w-full bg-[#ffffff] h-20 sticky top-0">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <Image src={RoomyLogo} alt="Roomy logo" width={64} height={64} className="md:flex gap-x-6"/>
            </Link>
            <Link href="/roommates" className="hidden md:flex gap-x-6 text-black text-lg">
              <p className="hover:text-violet-400">Roommates</p>
            </Link>
            <Link href="/rentals" className="hidden md:flex gap-x-6 text-black text-lg">
              <p className="hover:text-violet-400">Rentals</p>
            </Link>
            <div className="md:flex gap-x-6 text-black text-lg">
              <Searchbar chooseLocation={chooseLocation}/>
            </div>
          </div>
          <div className="relative text-left hidden md:block">
            <div onBlur={handleBlur} onFocus={() => showProfileDropdown(true)} tabIndex={100}>
              <Image
                height={64} width={64}
                src={ProfileDefaultLogo} alt="Profile Picture"
                />
              {profileDropdown ? <DropdownComponent /> : null }
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center md:hidden"
            onClick={toggle}
          >
            {/* Burger button on smaller screens */}
            <Bars3Icon height={40} width={40} color="black"/>
          </button>
        </div>
      </div>
    </div>
  );
};
