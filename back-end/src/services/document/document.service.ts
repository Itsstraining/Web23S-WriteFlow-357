import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserDocumentDocument } from 'src/schemas/document.schema';
import { DocumentModel } from 'src/models/document.model';

@Injectable()
export class DocumentService {
    constructor(@InjectModel(UserDocument.name) private userDocumentModel: Model<UserDocumentDocument>) { }

    async createDocument(document: UserDocument) {
        const createdDocument = new this.userDocumentModel(document);
        return createdDocument.save();
    }

    async getDocuments(uid: string): Promise<DocumentModel[]> {
        let documents = this.userDocumentModel.find({ uid: uid }).exec();
        return documents['documents'];
    }

    async getDocument(uid: string, id: string): Promise<DocumentModel> {
        let documents = this.userDocumentModel.find({ uid: uid }).exec();
        return documents['documents'].find((document: any) => document.id === id);
    }

    async updateDocument(uid: string, id: string, documentData: DocumentModel): Promise<string> {
        let document = await this.getDocument(uid, id);
        if (!document) return "Document not found";
        document = documentData;
        return `Document ${id} updated`;
    }

    async deleteDocument(uid: string, id: string): Promise<string> {
        let document = await this.getDocument(uid, id);
        if (!document) return "Document not found";
        return `Document ${id} deleted`;
    }

    async checkValidUser(uid: string): Promise<boolean> {
        let users = await this.userDocumentModel.find({ uid: uid }).exec();
        users.forEach((user: any) => {
            if (user.uid === uid) return true;
        });
        return false;
    }
}
