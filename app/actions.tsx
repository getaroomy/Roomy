import { User } from "firebase/auth";
import { UserProfileDetails } from "./lib/exports";
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getUserDetails = async (user: User | null): Promise<UserProfileDetails | null> => {
    if(user === null) return null;
    console.log("getUserDetails");
    const jwt = await user.getIdToken();
    const uid = user.uid;
    const result = await fetch(`${serverURL}/get_other_user?uid=${uid}`, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        mode: 'cors'
    })
    .then((res)=>res.json())
    .then((val)=>{
        return val;
    })
    .catch((err)=>{
        console.log(err);
        return null;
    });
    return result;
}