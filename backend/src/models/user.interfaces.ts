export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  posts: IPost[];
}

export interface IPost {
  id: string;
  post: string;
  createdBy?: IUser;
  createdById: string;
}
