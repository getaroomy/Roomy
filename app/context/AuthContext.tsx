import {useContext, createContext, useState, useEffect} from "react";
import {GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    UserCredential,
    User,
    getAdditionalUserInfo} from "firebase/auth"
import { auth } from "../firebase";
import { UserProfileDetails } from "@/app/lib/exports";

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

interface AuthContextType {
    user: User | null,
    googleSignIn: () => void,
    emailSignIn: (email:string, password:string) => void,
    emailCreateAccount: (email:string, password:string, fullName:string, gender:string) => void,
    logOut: () => void,
    loading: boolean
}
const defaultAuthContext: AuthContextType = {
    user: null,
    googleSignIn: () => {},
    emailSignIn: (email:string, password:string) => {},
    emailCreateAccount: (email:string, password:string, fullName:string, gender:string) => {},
    logOut: () => {},
    loading: true
}
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const createUserMetadata = async (userCred: UserCredential, fullName: string, gender: string, userEmail: string) => {
    const uid = userCred.user.uid;
    const jwt = await userCred.user.getIdToken();
    const userInfo: UserProfileDetails = {
        uid,
        bio: '',
        displayName: fullName,
        photoURL: '',
        phoneNumber: '',
        showPhoneNumber: false,
        gender,
        experiences: [],
        looking: true,
        email: userEmail,
        preferences: {
            roomWithGender: gender,
            doIHavePets: false,
            fineWithHavingPets: false,
            doISmoke: false,
            fineWithSmokers: false
        },
        status: 'Renter',
        city: 'Santa Cruz, CA, USA'
    }
    const res = await fetch(`${serverURL}/set_user_info`, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(userInfo)
    });
    console.group("createUserMetadata");
    console.log(userInfo);
    console.log(res);
    console.groupEnd();
    return res.ok;
}

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const googleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        await signInWithPopup(auth, provider)
            .then(async (userCred: UserCredential)=>{
                const {isNewUser} = getAdditionalUserInfo(userCred) ?? {};
                const providerData = userCred.user.providerData;
                const email = providerData[0]?.email ?? "emailnotfound@email.com";
                if (isNewUser){
                    const userCreated = await createUserMetadata(userCred, "New User", "None", email);
                    if (!userCreated) console.log("Error creating user account through Google sign in");
                }
                else console.log("User already exists with this Gmail account!");
            })
            .catch((err)=>{
                console.error(err);
            })
        setLoading(false);
    }

    const emailSignIn = async (email:string, password:string) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log("Error logging in through email:", err);
        }
        setLoading(false);
    }

    const emailCreateAccount = async (email:string, password:string, fullName:string, gender:string) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async (userCred: UserCredential)=>{
                    const userCreated = await createUserMetadata(userCred, fullName, gender, email);
                    if (!userCreated) console.log("Error creating user account through email and password");
                })
                .catch((err)=>{
                    console.error(err);
                })
        } catch (err) {
            console.log("Error creating acc with email:", err);
        }
        setLoading(false);
    }

    const logOut = () => {
        signOut(auth);
        setLoading(false);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);
    
    return (<AuthContext.Provider value={{user, googleSignIn, emailSignIn, emailCreateAccount, logOut, loading}}>{children}</AuthContext.Provider>)
}

export const UserAuth = () => {
    return useContext(AuthContext);
}