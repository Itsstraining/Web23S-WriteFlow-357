import { MailModel } from "src/models/mail.model";

export interface MailState{
  mails:MailModel[]|null;
  loading:boolean;
  inProcess:boolean;
  error:any;
}
