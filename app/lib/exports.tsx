export type UserProfileDetails = {
    uid: string,
    bio: string,
    displayName: string,
    photoURL?: string,
    phoneNumber?: string,
    showPhoneNumber: boolean
    gender: string,
    experiences?: Array<any>,
    looking: boolean,
    preferences?: {
        roomWithGender?: string,
        doIHavePets?: boolean,
        fineWithHavingPets?: boolean,
        doISmoke?: boolean,
        fineWithSmokers?: boolean
    },
    status?: string,
}