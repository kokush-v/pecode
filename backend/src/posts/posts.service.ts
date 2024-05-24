import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreatePost } from './post.dto';

@Injectable()
export class PostsService {
  private postRepository = new PrismaClient().postModel;

  private postSelectProperties: Prisma.PostModelSelect = {
    id: true,
    post: true,
    createdBy: {
      select: { id: true, email: true, name: true },
    },
  };

  async getMany() {
    return this.postRepository.findMany({ select: this.postSelectProperties });
  }

  async create({ post, createdById }: CreatePost) {
    return this.postRepository.create({
      data: {
        post,
        createdBy: {
          connect: { id: createdById },
        },
      },
      select: this.postSelectProperties,
    });
  }
}
