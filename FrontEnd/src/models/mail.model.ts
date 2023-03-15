
import { DocModel } from "src/app/models/doc.model";
import { UserModel } from "src/app/models/user.model";

export interface MailModel{
  doc: DocModel;
  date: string;
  id: string;
  sender: UserModel;
  type: string;
  right: string;
  sendTo: UserModel;
  isRead: boolean;
}
