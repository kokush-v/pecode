import { IsNotEmpty } from 'class-validator';

export class CreatePost {
  @IsNotEmpty()
  post: string;

  createdById: string;
}
