

/* eslint-disable prettier/prettier */
export interface UserModel {
    uid: string;
    email: string;
    bio: string;
    job: string[];
    displayName: string;
    photoURL: string;
    starDocuments: string[],
    following: string[],
    followers: string[],
}
