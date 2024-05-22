import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request, NextFunction, Response } from 'express';
import { ERRORS } from 'src/constant/err';

@Injectable()
export class RegisterMiddleware implements NestMiddleware {
  userRepository = new PrismaClient().userModel;

  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;

    if (!email) {
      throw new NotFoundException(ERRORS.INCORRECT_DATA);
    }

    const user = await this.userRepository.findUnique({
      where: { email },
    });

    if (user) {
      throw new BadRequestException(ERRORS.USER.EXIST);
    }

    next();
  }
}

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  userRepository = new PrismaClient().userModel;

  async use(req: Request, res: Response, next: NextFunction) {
    const email = req.body.email;

    if (!email) {
      throw new NotFoundException(ERRORS.INCORRECT_DATA);
    }

    const user = await this.userRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(ERRORS.USER.NOT_EXIST);
    }

    next();
  }
}
