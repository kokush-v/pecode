import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePost } from './post.dto';
import { JwtAuthGuard } from 'src/middlewares/auth/jwt.guard';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Request() req, @Body() postBody) {
    const validPost: CreatePost = {
      post: postBody.post,
      createdById: req.user.id,
    };

    return this.postService.create(validPost);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.postService.getMany();
  }
}
