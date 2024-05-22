import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { IUser } from 'src/models/user.interfaces';

@Injectable()
export class UsersService {
  userRepository = new PrismaClient().userModel;
  private userSelectProperties: Prisma.UserModelSelect = {
    id: true,
    name: true,
    email: true,
    password: true,
    posts: {
      select: {
        id: true,
        post: true,
      },
    },
  };

  async create(user: CreateUserDto): Promise<IUser> {
    return await this.userRepository.create({
      data: user,
      select: this.userSelectProperties,
    });
  }

  async findOne(email: string): Promise<IUser> {
    return await this.userRepository.findUniqueOrThrow({
      where: { email },
      select: this.userSelectProperties,
    });
  }
}

export default new UsersService();
