import { User } from "firebase/auth";
import { ProfileExperience, RoommatePreviewDetails, UserProfileDetails } from "@/app/lib/exports";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
import {v4 as uuidv4} from 'uuid';

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

export const updateProfilePicture = (user: User, file: Blob, pictureFileName: string) => {
    const storage = getStorage();
    const uid = user.uid;
    const fileType = pictureFileName.split('.').pop();
    const fileName = `profile_pictures/${uid}.${fileType}`;
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

export const addExperienceWithUser = async (user: User, profileExp: ProfileExperience, targetUid: string) => {
    if (user === null) return null;
    const jwt = await user.getIdToken();
    const body = {
        "target_uid": targetUid,
        "experience": profileExp
    }
    const result = await fetch(`${serverURL}/post_experience`,{
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(body)
    });
}

// --- Roommates Actions ---

export const getAvailableRoommates = async (user: User, params?: string | null): Promise<Array<RoommatePreviewDetails> | null> => {
    try {
        if (user === null) return null;
        const jwt = await user.getIdToken();
        const uid = user.uid;
        const result = await fetch(`${serverURL}/get_roommates?uid=${uid}${params}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors'
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

// -- Main Page Actions --

export const createNewFeedPost = async (user: User, text: string, files?: Array<File>, city?: string) => {
    let promises = [];
    var imgURLS: Array<string> = [];
    const storage = getStorage();
    if(files?.length){
        for (const file of files){
            const uuid = uuidv4();
            const fileName = `feed-images/${uuid}${file.name}`;
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytes(storageRef, file);
            promises.push(uploadTask.then((snapshot)=>{
                return getDownloadURL(storageRef);
            }));
        }
        try {
            const downloadURLs = await Promise.all(promises);
            console.log("Download URLs:", downloadURLs);
            imgURLS = downloadURLs;
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    }
    const jwt = await user.getIdToken();
    const date = new Date().toISOString();
    const feedBody = {
        uid: user.uid,
        post_text: text,
        media: imgURLS,
        date,
        city
    }
    const result = await fetch(`${serverURL}/create_feed_post`,{
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(feedBody)
    });
}

export const getFeedPosts = async (user: User, city?: string) => {
    try {
        if (user === null) return null;
        const jwt = await user.getIdToken();
        const uid = user.uid;
        const result = await fetch(`${serverURL}/get_feed_posts?uid=${uid}`, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        })
        .then((res)=>res.json())
        .then((val)=>{
            return val.posts;
        })
        .catch((err)=>{
            console.error(err);
            return null;
        });
        return result;
    } catch (err) {
        console.log('Error: ', err);
        throw new Error('Failed to get posts');
    }
}