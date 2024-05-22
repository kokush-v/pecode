import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  HttpException,
} from '@nestjs/common';
import { ERRORS } from 'src/constant/err';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/middlewares/auth/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    try {
      return this.authService.register(user);
    } catch (error) {
      throw new BadRequestException(ERRORS.USER.EXIST);
    }
  }

  @UseGuards()
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    try {
      return this.authService.login(user);
    } catch (error) {
      if (error instanceof HttpException)
        throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async get(@Request() req) {
    return { data: req.user };
  }
}
