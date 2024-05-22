import { IPost } from './post.interfaces';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  posts: IPost[];
}
