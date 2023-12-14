export type UserProfileDetails = {
    uid: string,
    bio: string,
    displayName: string,
    photoURL?: string,
    phoneNumber?: string,
    showPhoneNumber: boolean
    gender: string,
    experiences?: Array<ProfileExperience>,
    looking: boolean,
    email?: string,
    preferences?: {
        roomWithGender?: string,
        doIHavePets?: boolean,
        fineWithHavingPets?: boolean,
        doISmoke?: boolean,
        fineWithSmokers?: boolean
    },
    status?: string,
}

export type ProfileExperience = {
    uid: string,
    displayName: string,
    experience: string,
    photoURL?: string,
    date?: string
}