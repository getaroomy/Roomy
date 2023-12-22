import { User } from "firebase/auth";
import { RoommatePreviewDetails, UserProfileDetails } from "./lib/exports";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;

// --- User Profile Actions ---

export const getUserDetails = async (user: User | null): Promise<UserProfileDetails | null> => {
    if(user === null) return null;
    const jwt = await user.getIdToken();
    const uid = user.uid;
    const result = await fetch(`${serverURL}/get_my_profile?uid=${uid}`, {
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
        return null;
    });
    return result;
};

export const getOtherUser = async (user: User | null, reqUID: string) => {
    try {
        if (user === null || reqUID === null) return null;
        const jwt = await user.getIdToken();
        const result = await fetch(`${serverURL}/get_other_user_profile?uid=${reqUID}`, {
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
            return null;
        });
        return result;
    } catch (err) {
        console.log('Error: ', err);
        throw new Error('Failed to get other users info');
    }
}

export const updateProfilePicture = (user: User, file: Blob) => {
    const storage = getStorage();
    const uid = user.uid;
    const fileName = `profile_pictures/${uid}.jpg`;
    const storageRef = ref(storage, fileName);
    uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(storageRef).then(async (url)=>{
            const jwt = await user.getIdToken();
            const UserDetails = {
                uid,
                photoURL: url
            }
            const result = await fetch(`${serverURL}/update_profile_data`,{
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify(UserDetails)
            });
        })
    })
}

export const updateUserDetails = async (user: User, UserDetails: UserProfileDetails) => {
    if (user === null || UserDetails === null) return null;
    const jwt = await user.getIdToken();
    if(user.uid === UserDetails.uid){
        const result = await fetch(`${serverURL}/update_profile_data`,{
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(UserDetails)
        });
    } else {
        console.log("You're trying to edit someone else's account");
    }
}

// --- Roommates Actions ---

export const getAvailableRoommates = async (user: User, page?: string | null, params?: string | null): Promise<Array<RoommatePreviewDetails> | null> => {
    try {
        if (user === null) return null;
        const jwt = await user.getIdToken();
        const uid = user.uid;
        let urlParams = ``; // Params
        const result = await fetch(`${serverURL}/get_roommates?uid=${uid}${urlParams}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            mode: 'no-cors'
        })
        .then((res)=>res.json())
        .then((val)=>{
            return val.roommates;
        })
        .catch((err)=>{
            console.error(err);
            return null;
        });
        return result;
    } catch (err) {
        console.log('Error: ', err);
        throw new Error('Failed to get available roommates');
    }
}