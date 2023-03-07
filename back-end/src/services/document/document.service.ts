import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doc, DocDocument } from 'src/schemas/document.schema';
import { DocModel } from 'src/models/document.model';
import { DeleteResult } from 'mongodb';

@Injectable()
export class DocumentService {
    constructor(@InjectModel(Doc.name) private documentModel: Model<DocDocument>) { }

    async createDocument(document: DocModel): Promise<DocModel> {
        const createdDocument = new this.documentModel(document);
        return createdDocument.save();
    }

    async getDocuments(uid: string): Promise<DocModel[]> {
        if (uid) {
            const documents = this.documentModel.find({ uid: uid }).exec();
            return documents;
        }

        const documents = this.documentModel.find({ isPublic: true }).exec();
        return documents;
    }

    async getDocument(id: string): Promise<DocModel> {
        const document = this.documentModel.findOne({ id: id }).exec();
        return document;
    }

    async updateDocument(id: string, uid: string, documentModel: DocModel): Promise<DocModel> {
        const document = await this.documentModel.findOne({ id: id }).exec();

        if (!document) return null;
        if (document.uid != uid) return null;

        Object.assign(document, documentModel);
        return document.save();
    }

    async deleteDocument(id: string): Promise<DeleteResult> {
        const document = this.documentModel.deleteOne({ id: id }).exec();
        return document;
    }
}
