import { IUser } from './user.interfaces';

export interface IPost {
  id: string;
  post: string;
  createdBy?: IUser;
  createdById: string;
}
