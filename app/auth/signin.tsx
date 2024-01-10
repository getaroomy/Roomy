import {useState} from "react"

export default function SignIn({emailSigninAuth, googleAuth}:{
  emailSigninAuth: (email: string, password: string) => void,
  googleAuth: () => void
}) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignInEmail = () => {
    emailSigninAuth(email, password);
  }

  return (
    <main className="flex flex-col items-center py-8">
      <div className="px-6 sm:px-0 max-w-md" onClick={googleAuth}>
        <button type="button" className="text-white w-full  bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2">
            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                </path>
            </svg>
            Sign In With Google
        </button>
      </div>
      <label className="block pt-4">
        <span className="block text-sm font-medium text-slate-700">Email</span>
        <input value={email} onChange={(e)=>setEmail(e.currentTarget.value)} type="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-purple-400
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" required/>
      </label>
      <label className="block pt-4 pb-4">
        <span className="block text-sm font-medium text-slate-700">Password</span>
        <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)} type="password" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-purple-400
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" required/>
      </label>
      <button
        className="text-white bg-purple-400 hover:bg-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-none text-lg px-5 py-2.5 text-center inline-flex items-center me-2"
        onClick={handleSignInEmail}>
        Sign In
      </button>
    </main>
  )
}
