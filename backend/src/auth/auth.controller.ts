import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/middlewares/auth/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @UseGuards()
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async get(@Request() req) {
    return { data: req.user };
  }
}
