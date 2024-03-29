"use client";
import { UserAuth } from "@/app/context/AuthContext"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getUserDetails, updateUserDetails, updateProfilePicture } from "@/app/actions";
import { UserProfileDetails } from "@/app/lib/exports";
import UserProfileLogo from "@/public/user-profile-logo.svg";
import Searchbar from "@/app/components/searchbar";

export default function EditProfile({ params }: { params: { uid: string } }) {
    const router = useRouter();

	const {user, loading} = UserAuth();
	const [currentUser, setCurrentUser] = useState<UserProfileDetails | null>();
	const [bio, setBio] = useState<string>("");
	const [displayName, setDisplayName] = useState<string>("");
	const [profilePhotoURL, setProfilePhotoURL] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [gender, setGender] = useState<string>("");
	const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);
	const [roomWithGender, setRoomWithGender] = useState<string>("any");
	const [doIHavePets, setDoIHavePets] = useState<boolean>(false);
	const [fineWithHavingPets, setFineWithHavingPets] = useState<boolean>(false);
	const [doISmoke, setDoISmoke] = useState<boolean>(false);
	const [fineWithSmokers, setFineWithSmokers] = useState<boolean>(false);
	const [tempProfilePic, setTempProfilePic] = useState<string | ArrayBuffer | null | undefined>();
	const [tempProfilePicFile, setTempProfilePicFile] = useState<Blob | null>();
	const [pictureFileName, setPictureFileName] = useState<string>("");
	const [looking, setLooking] = useState<boolean>(false);
	const [city, setCity] = useState<string>("");

	useEffect(()=>{
		if (!user && !loading) router.push("/auth");
		if (user){
			if(user.uid !== params.uid){
				router.push("/");
				return;
			}
			const getCurrentUserData = async () => {
				const userDetails = await getUserDetails(user);
				setCurrentUser(userDetails);
			}
			getCurrentUserData();
		}
	},[loading, params.uid, router, user]);

    useEffect(()=>{
        setBio(currentUser?.bio || "");
		setDisplayName(currentUser?.displayName || "");
		setProfilePhotoURL(currentUser?.photoURL || "");
		setPhoneNumber(currentUser?.phoneNumber || "");
        setShowPhoneNumber(currentUser?.showPhoneNumber || false);
        setGender(currentUser?.gender || "");
        setRoomWithGender(currentUser?.preferences?.roomWithGender || "any");
        setDoIHavePets(currentUser?.preferences?.doIHavePets || false);
        setFineWithHavingPets(currentUser?.preferences?.fineWithHavingPets || false);
		setDoISmoke(currentUser?.preferences?.doISmoke || false);
		setFineWithSmokers(currentUser?.preferences?.fineWithSmokers || false);
		setLooking(currentUser?.looking || false);
		setCity(currentUser?.city || "");
    }, [currentUser]);

	const setShowPhoneNumberHandler = () => {
		setShowPhoneNumber(!showPhoneNumber);
	}
	const setDoIHavePetsHandler = () => {
		setDoIHavePets(!doIHavePets);
	}
	const setFineWithHavingPetsHandler = () => {
		setFineWithHavingPets(!fineWithHavingPets);
	}

	const setDoISmokeHandler = () => {
		setDoISmoke(!doISmoke);
	}

	const setFineWithSmokersHandler = () => {
		setFineWithSmokers(!fineWithSmokers);
	}

	const setLookingHandler = () => {
		setLooking(!looking);
	}

	const saveUserDataHandler = () => {
		if(currentUser === null || currentUser === undefined || user === null) {
			return;
		}
		const userDetails: UserProfileDetails = {
			uid: currentUser.uid,
			bio,
			displayName,
			phoneNumber,
			showPhoneNumber,
			gender,
			preferences: {
				roomWithGender,
				doIHavePets,
				fineWithHavingPets,
				doISmoke,
        		fineWithSmokers,
			},
			looking,
			city
		}
		updateUserDetails(user, userDetails);
		router.push(`/profile/${user.uid}`);
	}

	const handleProfilePicChange = (e: any) => {
		var fReader = new FileReader();
		setTempProfilePicFile(e.target.files[0]);
		fReader.readAsDataURL(e.target.files[0]);
		fReader.onloadend = function(event){
			setTempProfilePic(event.target?.result);
			setPictureFileName(e.target.files[0].name);
		}
	}

	const saveProfilePicture = () => {
		if (user?.uid && tempProfilePicFile){
			updateProfilePicture(user, tempProfilePicFile, pictureFileName);
			setTempProfilePic(null);
		}
	}

	const cancelProfilePicUpload = () => {
		setTempProfilePic(null);
		setTempProfilePicFile(null);
	}

	const chooseLocation = (city: string) => {
		setCity(city);
	}

	return (
		<main className="min-h-screen grid-cols-1 px-24 py-12 sm:grid-cols-6">
			{/* Header */}
			<div id="header" className="pb-8 items-center col-span-full mt-2">
				{/* Profile Pic */}
				<div id="profilePic" className="mt-2 flex items-center gap-x-3">
					<Image
						src={tempProfilePic ? tempProfilePic : (profilePhotoURL ? profilePhotoURL : UserProfileLogo)}
						alt="Profile picture"
						height={128} width={128}
						className="flex items-center justify-center rounded-full" />
					<label htmlFor="profilePicUpload" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Upload profile picture</label>
					{tempProfilePic ?
						<div>
							<button onClick={cancelProfilePicUpload} className="rounded-md bg-red-400 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-red-700 hover:bg-red-500">Cancel</button>
							<button onClick={saveProfilePicture} className="rounded-md bg-green-300 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-green-600 hover:bg-green-500">Save</button>
						</div>
					: null}
					<input type="file" id="profilePicUpload" accept="image/*" hidden onChange={handleProfilePicChange}/>
				</div>
				<div className="pt-2 rounded">
					<label htmlFor="profileVisibilityCheckbox" className="h-6 relative inline-block">
						<input id="profileVisibilityCheckbox" type="checkbox" checked={looking} onChange={setLookingHandler} className="w-11 h-0 cursor-pointer inline-block focus:outline-0 border-0
						focus:ring-offset-transparent focus:ring-transparent focus-within:ring-0
						focus:shadow-none after:absolute before:absolute after:top-0 before:top-0 after:block before:inline-block before:rounded-full after:rounded-full
						after:content-[''] after:w-5 after:h-5 after:mt-0.5 after:ml-0.5 after:shadow-md after:duration-100 before:content-[''] before:w-10 before:h-full before:shadow-[inset_0_0_#000]
						after:bg-white before:bg-gray-300 before:checked:bg-green-400 checked:after:duration-300 checked:after:translate-x-4
						disabled:after:bg-opacity-75 disabled:cursor-not-allowed disabled:checked:before:bg-opacity-40" />
						Profile Visibility: {looking ? " Public" : " Private"}
					</label>
				</div>
			</div>
			{/* Personal Info */}
			<div id="personalInfo" className="border-b-2 border-dashed">
				<h1 className="pt-1 text-xl font-bold">Personal Info</h1>
				{/* Display Name */}
				<div className="pb-4 col-span-full mt-2">
					<label htmlFor="displayName" className="block text-sm font-medium leading-6 text-gray-900">Your Name</label>
					<input id="displayName" type="text" value={displayName} onChange={(e)=>setDisplayName(e.currentTarget.value)}
						className="block sm:w-full lg:w-1/6 rounded-md border-0 py-1.5
						text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
						placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
				</div>
				{/* Bio */}
				<div className="pb-4 col-span-full mt-2">
					<label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">Profile Bio</label>
					<div className="mt-2">
						<textarea id="bio" name="bio" value={bio} onChange={(e)=>setBio(e.currentTarget.value)} rows={3}
						className="block sm:w-full lg:w-1/2 rounded-md border-0 py-1.5
							text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
							placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
					</div>
					<p className="mt-3 text-sm leading-6 text-gray-600">Tell fellow Roomies about yourself</p>
				</div>
				<div className="pb-4 col-span-full mt-2">
					<label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Where do you want to live?</label>
					<Searchbar placeholder={city} chooseLocation={chooseLocation} />
				</div>
				{/* Phone Number */}
				<div className="pb-8 col-span-full mt-2">
					<div className="space-y-2">
						<label
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							htmlFor="phone-number">
							Phone Number
						</label>
						<input
							className="flex h-10 sm:w-full lg:w-1/6 rounded-md border border-input bg-background px-3 py-2 text-sm
								ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
								focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							id="phone-number"
							placeholder="Enter your phone number"
							value={phoneNumber}
							onChange={(e)=>setPhoneNumber(e.currentTarget.value)}
							required={true}
							type="tel"/>
						<p id="phone-number-format" className="text-sm text-gray-500">Format: 123-456-7890</p>
					</div>
					<div className="pt-2 rounded flex">
						<label htmlFor="phoneNumberVisibility" className="h-6 relative inline-block">
							Make phone number visible to public:&nbsp;
						</label>
						<div>
							<input id="phoneNumberVisibility" type="checkbox" checked={showPhoneNumber} onChange={setShowPhoneNumberHandler} className="h-6 relative w-11 cursor-pointer inline-block focus:outline-0 border-0
								focus:ring-offset-transparent focus:ring-transparent focus-within:ring-0
								focus:shadow-none after:absolute before:absolute after:top-0 before:top-0 after:block before:inline-block before:rounded-full after:rounded-full
								after:content-[''] after:w-5 after:h-5 after:mt-0.5 after:ml-0.5 after:shadow-md after:duration-100 before:content-[''] before:w-10 before:h-full before:shadow-[inset_0_0_#000]
								after:bg-white before:bg-gray-300 before:checked:bg-green-400 checked:after:duration-300 checked:after:translate-x-4
								disabled:after:bg-opacity-75 disabled:cursor-not-allowed disabled:checked:before:bg-opacity-40" />
						</div>
					</div>
				</div>
				{/* Gender */}
				<div className="pb-4  mt-2">
					<label className="text-sm font-medium leading-6 text-gray-900">My gender is
					<div className="flex flex-col sm:flex-row py-2">
						<button onClick={()=>setGender("male")} type="button" className={`text-white ${gender === "male" ? "bg-blue-800" : "bg-slate-400"} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center me-2 mb-2 `}>
							Male
							<svg className="rtl:rotate-180 w-5 h-5 ms-2 fill-red-50" viewBox="0 0 512 512">
									<path d="M220.07,152.702c-84.202,0-152.702,68.5-152.702,152.702s68.5,152.702,152.702,152.702s152.702-68.5,152.702-152.702
											S304.272,152.702,220.07,152.702z"/>
									<path d="M489.544,0H345.825c-4.958,0-8.982,4.015-8.982,8.982v35.93c0,4.967,4.024,8.982,8.982,8.982h60.703l-76.557,76.549
											c-32.912-20.714-70.746-31.636-109.9-31.636c-113.916,0-206.596,92.672-206.596,206.596S106.155,512,220.07,512
											s206.596-92.672,206.596-206.596c0-52.574-19.483-102.077-55.054-140.387l73.018-73.018v60.703c0,4.967,4.024,8.982,8.982,8.982
											h35.93c4.958,0,8.982-4.015,8.982-8.982V8.982C498.526,4.015,494.502,0,489.544,0z M390.737,305.404
											c0,94.109-76.557,170.667-170.667,170.667S49.404,399.513,49.404,305.404s76.557-170.667,170.667-170.667
											S390.737,211.294,390.737,305.404z"/>
							</svg>
						</button>
						<button onClick={()=>setGender("female")} type="button" className={`text-white ${gender === "female" ? "bg-pink-400" : "bg-slate-400"} hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center me-2 mb-2 `}>
							Female
							<svg className="rtl:rotate-180 w-5 h-5 ms-2 fill-red-50" viewBox="0 0 512 512">
									<path d="M256,51.2c-61.167,0-110.933,49.766-110.933,110.933S194.833,273.067,256,273.067S366.933,223.3,366.933,162.133
											S317.167,51.2,256,51.2z"/>
									<path d="M418.133,162.133C418.133,72.73,345.404,0,256,0S93.867,72.73,93.867,162.133c0,80.128,58.172,147.635,136.533,160.051
											v44.749h-59.733c-4.71,0-8.533,3.814-8.533,8.533V409.6c0,4.719,3.823,8.533,8.533,8.533H230.4v85.333
											c0,4.719,3.823,8.533,8.533,8.533h34.133c4.71,0,8.533-3.814,8.533-8.533v-85.333h59.733c4.71,0,8.533-3.814,8.533-8.533v-34.133
											c0-4.719-3.823-8.533-8.533-8.533H281.6v-44.749C359.962,309.769,418.133,242.261,418.133,162.133z M256,290.133
											c-70.579,0-128-57.421-128-128s57.421-128,128-128s128,57.421,128,128S326.579,290.133,256,290.133z"/>
							</svg>
						</button>
						<button onClick={()=>setGender("nonbinary")} type="button" className={`text-white ${gender === "nonbinary" ? " bg-purple-500" : "bg-slate-400"} hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center me-2 mb-2 `}>
							Nonbinary
							<svg fill="#ffffff" className="rtl:rotate-180 w-5 h-5 ms-2 fill-red-50" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
								<g strokeWidth="0"/>
								<g strokeLinecap="round" strokeLinejoin="round"/>
								<g><path d="M136,88.42383V59.01465l23.25049,15.625a7.99987,7.99987,0,1,0,8.9248-13.2793L142.34253,44l25.83276-17.36035a7.99987,7.99987,0,1,0-8.9248-13.2793L128,34.36133l-31.25049-21.001a7.99987,7.99987,0,1,0-8.9248,13.2793L113.65747,44,87.82471,61.36035a7.99987,7.99987,0,1,0,8.9248,13.2793L120,59.01465V88.42383a76,76,0,1,0,16,0ZM128,224a60,60,0,1,1,60-60A60.06812,60.06812,0,0,1,128,224Z"/></g>
							</svg>
						</button>
					</div></label>
				</div>
			</div>
			{/* Preferences */}
			<div id="preferences">
				{/* Room With Gender */}
				<div className="pb-8 col-span-full mt-2">
					<h1 className="pt-1 text-xl font-bold">Preferences</h1>
					<label className="text-sm font-medium leading-6 text-gray-900">I will only room with
						<div className="flex flex-col sm:flex-row py-2">
							<button onClick={()=>setRoomWithGender("male")} type="button" className={`text-white ${roomWithGender === "male" ? "bg-blue-800" : "bg-slate-400"} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center me-2 mb-2 `}>
								Male
								<svg className="rtl:rotate-180 w-5 h-5 ms-2 fill-red-50" viewBox="0 0 512 512">
										<path d="M220.07,152.702c-84.202,0-152.702,68.5-152.702,152.702s68.5,152.702,152.702,152.702s152.702-68.5,152.702-152.702
												S304.272,152.702,220.07,152.702z"/>
										<path d="M489.544,0H345.825c-4.958,0-8.982,4.015-8.982,8.982v35.93c0,4.967,4.024,8.982,8.982,8.982h60.703l-76.557,76.549
												c-32.912-20.714-70.746-31.636-109.9-31.636c-113.916,0-206.596,92.672-206.596,206.596S106.155,512,220.07,512
												s206.596-92.672,206.596-206.596c0-52.574-19.483-102.077-55.054-140.387l73.018-73.018v60.703c0,4.967,4.024,8.982,8.982,8.982
												h35.93c4.958,0,8.982-4.015,8.982-8.982V8.982C498.526,4.015,494.502,0,489.544,0z M390.737,305.404
												c0,94.109-76.557,170.667-170.667,170.667S49.404,399.513,49.404,305.404s76.557-170.667,170.667-170.667
												S390.737,211.294,390.737,305.404z"/>
								</svg>
							</button>
							<button onClick={()=>setRoomWithGender("female")} type="button" className={`text-white ${roomWithGender === "female" ? "bg-pink-400" : "bg-slate-400"} hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center me-2 mb-2 `}>
								Female
								<svg className="rtl:rotate-180 w-5 h-5 ms-2 fill-red-50" viewBox="0 0 512 512">
										<path d="M256,51.2c-61.167,0-110.933,49.766-110.933,110.933S194.833,273.067,256,273.067S366.933,223.3,366.933,162.133
												S317.167,51.2,256,51.2z"/>
										<path d="M418.133,162.133C418.133,72.73,345.404,0,256,0S93.867,72.73,93.867,162.133c0,80.128,58.172,147.635,136.533,160.051
												v44.749h-59.733c-4.71,0-8.533,3.814-8.533,8.533V409.6c0,4.719,3.823,8.533,8.533,8.533H230.4v85.333
												c0,4.719,3.823,8.533,8.533,8.533h34.133c4.71,0,8.533-3.814,8.533-8.533v-85.333h59.733c4.71,0,8.533-3.814,8.533-8.533v-34.133
												c0-4.719-3.823-8.533-8.533-8.533H281.6v-44.749C359.962,309.769,418.133,242.261,418.133,162.133z M256,290.133
												c-70.579,0-128-57.421-128-128s57.421-128,128-128s128,57.421,128,128S326.579,290.133,256,290.133z"/>
								</svg>
							</button>
							<button onClick={()=>setRoomWithGender("nonbinary")} type="button" className={`text-white ${roomWithGender === "nonbinary" ? " bg-purple-500" : "bg-slate-400"} hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center me-2 mb-2 `}>
								Nonbinary
								<svg fill="#ffffff" className="rtl:rotate-180 w-5 h-5 ms-2 fill-red-50" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
									<g strokeWidth="0"/>
									<g strokeLinecap="round" strokeLinejoin="round"/>
									<g><path d="M136,88.42383V59.01465l23.25049,15.625a7.99987,7.99987,0,1,0,8.9248-13.2793L142.34253,44l25.83276-17.36035a7.99987,7.99987,0,1,0-8.9248-13.2793L128,34.36133l-31.25049-21.001a7.99987,7.99987,0,1,0-8.9248,13.2793L113.65747,44,87.82471,61.36035a7.99987,7.99987,0,1,0,8.9248,13.2793L120,59.01465V88.42383a76,76,0,1,0,16,0ZM128,224a60,60,0,1,1,60-60A60.06812,60.06812,0,0,1,128,224Z"/></g>
								</svg>
							</button>
							<button onClick={()=>setRoomWithGender("any")} type="button" className={`text-white ${roomWithGender === "any" ? " bg-emerald-500" : "bg-slate-400"} hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center inline-flex items-center me-2 mb-2 `}>
								Any
							</button>
						</div>
					</label>
				</div>
				<div className="md:columns-2 sm:columns-1">
					{/* Pets */}
					<div className="pb-8 col-span-full mt-2">
						<label htmlFor="havePetsCheckbox" className="text-md font-bold leading-6 text-gray-900">Pets</label>
						<div className="flex items-center mb-4">
							<input id="havePetsCheckbox" type="checkbox" checked={doIHavePets} onChange={setDoIHavePetsHandler} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
							<label htmlFor="havePetsCheckbox" className="ms-2 text-md font-medium text-gray-900">I have pet(s)</label>
						</div>
						<div className="flex items-center mb-4">
							<input id="fineWithHavingPetsCheckbox" type="checkbox" checked={fineWithHavingPets} onChange={setFineWithHavingPetsHandler} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
							<label htmlFor="fineWithHavingPetsCheckbox" className="ms-2 text-md font-medium text-gray-900">I&apos;m fine with my roommates having pets</label>
						</div>
					</div>
					{/* Smokers */}
					<div className="pb-8 col-span-full mt-2">
						<label htmlFor="doISmokeCheckbox" className="text-md font-bold leading-6 text-gray-900">Smokers</label>
						<div className="flex items-center mb-4">
							<input id="doISmokeCheckbox" type="checkbox" checked={doISmoke} onChange={setDoISmokeHandler} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
							<label htmlFor="doISmokeCheckbox" className="ms-2 text-md font-medium text-gray-900">I smoke regularly</label>
						</div>
						<div className="flex items-center mb-4">
							<input id="fineWithSmokersCheckbox" type="checkbox" checked={fineWithSmokers} onChange={setFineWithSmokersHandler} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
							<label htmlFor="fineWithSmokersCheckbox" className="ms-2 text-md font-medium text-gray-900">I&apos;m fine with my roommates smoking</label>
						</div>
					</div>
				</div>
			</div>
			{/* Save Button */}
			<div id="save">
				<button id="save-button" type="button" onClick={saveUserDataHandler} className={`text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-5 text-center inline-flex items-center me-2 mb-2 `}>
					Save
				</button>
			</div>
		</main>
	)
}