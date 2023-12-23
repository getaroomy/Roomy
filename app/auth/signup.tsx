import {useState} from "react"
import { UserAuth } from "../context/AuthContext"

export default function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [gender, setGender] = useState<string>("");

    const { emailCreateAccount, googleSignIn } = UserAuth();

    const handleSignUpEmail = () => {
        emailCreateAccount(email, password, fullName, gender);
    }

    return (
      <main className="flex min-h-screen flex-col items-center py-8">
        <div className="px-6 sm:px-0 max-w-md" onClick={googleSignIn}>
            <button type="button" className="text-white w-full  bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" viewBox="0 0 488 512">
                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                    </path>
                </svg>
                Sign Up With Google
            </button>
        </div>
        <label className="block pt-4">
            <span className="block text-sm font-medium text-slate-700">Email</span>
            <input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} type="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-purple-400
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" required/>
        </label>
        <label className="block pt-4">
            <span className="block text-sm font-medium text-slate-700">Password</span>
            <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)} type="password" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-purple-400
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" required/>
        </label>
        <label className="block pt-4">
            <span className="block text-sm font-medium text-slate-700">Full Name</span>
            <input value={fullName} onChange={(e)=>setFullName(e.currentTarget.value)} type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-purple-400
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" required/>
        </label>
        <span className="block pt-4 text-lg font-medium text-slate-700">Gender</span>
        <div className="flex flex-row py-8">
            <button onClick={()=>setGender("male")} type="button" className={`text-white ${gender === "male" ? "bg-blue-800" : "bg-slate-400"} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 `}>
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
            <button onClick={()=>setGender("female")} type="button" className={`text-white ${gender === "female" ? "bg-pink-400" : "bg-slate-400"} hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center `}>
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
        </div>
        <button
            className="text-white bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-none text-lg px-5 py-2.5 text-center inline-flex items-center me-2 "
            onClick={handleSignUpEmail}>
            Submit
        </button>
      </main>
    )
  }
  