export interface DocModel {
    id: string;
    name: string;
    contentPath: string;
    dateCreated: string;
    dateModified: string;
    stars: number;

    isPublic: boolean;
    isDelete: boolean;

    forkedFrom: string;

    uid: string;
}