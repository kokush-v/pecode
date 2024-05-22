import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePost } from './post.dto';

@Injectable()
export class PostsService {
  private postRepository = new PrismaClient().postModel;

  async getMany() {
    return this.postRepository.findMany();
  }

  async create({ post, createdById }: CreatePost) {
    return this.postRepository.create({
      data: {
        post,
        createdBy: {
          connect: { id: createdById },
        },
      },
    });
  }
}
