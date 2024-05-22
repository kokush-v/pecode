import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { IUser } from 'src/models/user.interfaces';
import { ERRORS } from 'src/constant/err';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginUserDto): Promise<IUser> {
    const user = await this.usersService.findOne(email);

    if (bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      throw new BadRequestException(ERRORS.USER.WRONG_PASSWORD);
    }
  }

  async register(user: CreateUserDto) {
    const newUser = await this.usersService.create({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    });

    const payload = { username: newUser.name, sub: newUser.id };

    return {
      data: newUser,
      access_token: this.jwtService.sign(payload),
    };
  }

  async login(user: LoginUserDto) {
    const validUser = await this.validateUser(user);

    const payload = { username: validUser.name, sub: validUser.id };

    return {
      data: validUser,
      access_token: this.jwtService.sign(payload),
    };
  }
}
