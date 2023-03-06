export interface DocumentModel {
    id: string;
    contentPath: string;
    dateCreated: string;
    dateModified: string;
    status: string;
    isDelete: boolean;
    isStarred: boolean;
}

export interface UserDocumentModel {
    uid: string;
    documents: DocumentModel[];
}
