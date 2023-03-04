import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document, DocumentDocument } from 'src/schemas/document.schema';

@Injectable()
export class DocumentService {
    constructor(@InjectModel(Document.name) private documentModel: Model<DocumentDocument>) { }

    async create(document: Document): Promise<Document> {
        const createdDocument = new this.documentModel(document);
        return createdDocument.save();
    }

    async findAll(): Promise<Document[]> {
        return this.documentModel.find().exec();
    }

    async findOne(id: string): Promise<Document> {
        return this.documentModel.findOne({ id }).exec();
    }

    async findByOwnerId(ownerId: string): Promise<Document[]> {
        return this.documentModel.find({ ownerId }).exec();
    }

    async update(id: string, document: Document): Promise<void> {
        let documentFind = this.documentModel.findOne({ id }).exec();
        documentFind.then((doc) => {
            doc.contentPath = document.contentPath;
            doc.dateModified = document.dateModified;
            doc.status = document.status;
            doc.save();
        })
    }

    async remove(id: string): Promise<void> {
        let documentFind = this.documentModel.findOne({ id }).exec();
        documentFind.then((doc) => {
            doc.isDelete = true;
            doc.save();
        });
    }

    async removePermanently(id: string): Promise<void> {
        this.documentModel.remove({ id }).exec();
    }

}
