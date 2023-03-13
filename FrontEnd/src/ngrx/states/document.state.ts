import { DocModel } from "src/app/models/doc.model";

export interface DocumentState {
  documents:DocModel[]|null;
  document:DocModel|null;
  loading:boolean;
  inProcess:boolean;
  error:any;

}
