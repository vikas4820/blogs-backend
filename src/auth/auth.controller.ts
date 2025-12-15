import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from 'src/components/user/user.service';
import { UsersDto } from 'src/components/user/users.dto';
import { LoginDto } from './login.dto';
import { Users } from 'src/components/user/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) user: UsersDto) {
    return await this.userService.createUser(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }
}
