export interface DocModel {
  id: string;
  contentPath: string;
  dateCreated: string;
  dateModified: string;
  stars: number;
  isPublic: boolean;
  isDelete: boolean;
  forkedFrom: string;
  canView:string[];
  canEdit: string[];
  uid: string;
}
