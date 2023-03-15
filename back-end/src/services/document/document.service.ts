/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doc, DocDocument } from 'src/schemas/document.schema';
import { DocModel } from 'src/models/document.model';
import { DeleteResult } from 'mongodb';
import { UserService } from '../user/user.service';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class DocumentService {
    constructor(@InjectModel(Doc.name) private documentModel: Model<DocDocument>,@InjectModel(User.name) private userModel: Model<UserDocument>, private userSerivce: UserService) { }

    async createDocument(document: DocModel): Promise<DocModel> {
        const createdDocument = new this.documentModel(document);
        return createdDocument.save();
    }

    async getDocuments(uid: string): Promise<DocModel[]> {
        if (uid) {
            const documents = this.documentModel.find({ uid: uid, isDelete: false }).exec();
            return documents;
        }

        const documents = this.documentModel.find({ isPublic: true }).exec();
        return documents;
    }

    async getDocumentsPublic(uid: string): Promise<DocModel[]> {
        const documents = this.documentModel.find({ uid: uid, isDelete: false, isPublic: true }).exec();
        return documents;
    }

    async getDocument(id: string, uid: string): Promise<DocModel> {
        //find if document uid == uid and canView or canEdit contains uid
        const document = await this.documentModel.findOne({ id: id }).exec();
        // if document uid is not equal to uid, if in canView or canEdit, return null
        if (!document) return null;
        if (document.uid != uid) {
            let inView = document.canView.findIndex((element) => element == uid);
            let inEdit = document.canEdit.findIndex((element) => element == uid);
            if (inView === -1 && inEdit===-1) return null;
            
            return document;
        } else {
            return document;
        }




    }

    async updateDocument(id: string, uid: string, documentModel: DocModel): Promise<DocModel> {
        const document = await this.documentModel.findOne({ id: id }).exec();

        if (!document) return null;
        if (document.uid != uid) return null;

        Object.assign(document, documentModel);
        return document.save();
    }

    async deleteDocument(id: string, uid: string): Promise<DeleteResult> {
        const findDoc = await this.documentModel.findOne({ id: id }).exec();
        if (!findDoc) return null;
        if (findDoc.uid != uid) return null;
        const document = this.documentModel.deleteOne({ id: id }).exec();
        return document;
    }

    async addViewer(id: string, vieweruid: string): Promise<DocModel> {
        const document = await this.documentModel.findOne({ id: id }).exec();
        document.canView.push(vieweruid);
        return document.save();
    }

    async addEditor(id: string, vieweruid: string): Promise<DocModel> {
        const document = await this.documentModel.findOne({ id: id }).exec();
        document.canEdit.push(vieweruid);
        return document.save();
    }

    async removeViewer(id: string, vieweruid: string): Promise<DocModel> {
        const document = await this.documentModel.findOne({ id: id }).exec();
        document.canView = document.canView.filter(uid => uid != vieweruid);
        return document.save();
    }

    async removeEditor(id: string, vieweruid: string): Promise<DocModel> {
        const document = await this.documentModel.findOne({ id: id }).exec();
        document.canEdit = document.canEdit.filter(uid => uid != vieweruid);
        return document.save();
    }
    async updateDocumentField(id: string, uid: string, updateField: string, updateValue: any): Promise<DocModel> {
        const document = await this.documentModel.findOne({ id: id }).exec();
        if (typeof document[updateField] != typeof updateValue) return null;
        if (!document) return null;
        if (document.uid != uid) return null;

        switch (updateField) {
            case 'name':
                document.name = updateValue;
                break;
            case 'contentPath':
                document.contentPath = updateValue;
                break;
            case 'isPublic':
                document.isPublic = updateValue;
                break;
            case 'isDelete':
                document.isDelete = updateValue;
        }
        return document.save();
    }
    //user star document
    async starDocument(id: string, uid: string): Promise<DocModel> {
        const document = await this.documentModel.findOne({ id: id }).exec();
        if (!document) return null;
        if (document.uid == uid) return null;
        const user = await this.userSerivce.getUser(uid);
        if (!user) return null;
        user.starDocuments.push(id);
        document.stars++;
        await user.save();
        return document.save();
    }
    //filter document by user Id and isDeleted
    async getDeletedDocumentsByUserId(uid: string): Promise<DocModel[]> {
        const documents = this.documentModel.find({ uid: uid, isDelete: true }).exec();
        return documents;
    }
    //get shared document by user Id
    async getSharedDocumentsByUserId(uid: string): Promise<DocModel[]> {
        //user must meet uid and canView or canEdit contain uid and isDelete is false
        const documents = this.documentModel.find({ $and: [{ uid: { $ne: uid } }, { $or: [{ canView: uid }, { canEdit: uid }]}] }).exec();
        return documents;
    }
    async getAllUserInDocument(id: string){
        const document = await this.documentModel.findOne({ id: id }).exec();
        let users=await this.userModel.find().exec();
       
        let result=[];
        for(let user of users){
            let inView = document.canView.findIndex((element) => element == user.uid);
            let inEdit = document.canEdit.findIndex((element) => element == user.uid);
            if (inView !== -1 || inEdit!==-1) 
            result.push({...user,role:inEdit!==-1?'canEdit':'canView'});
        }
        return result;
    };
    //only for watch dog to get document
    async getDocumentForWatchDog(id: string): Promise<DocModel> {
    const document=await this.documentModel.findOne({ id: id }).exec();
    return document;
    }
}
