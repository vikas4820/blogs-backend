import { Controller, Post, Body, ValidationPipe, Param, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/components/user/user.service';
import { UsersDto } from 'src/components/user/users.dto';
import { LoginDto } from './login.dto';
import { Users } from 'src/components/user/users.entity';
import { AuthService } from './auth.service';
import { ResetPasswordDto } from './reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) user: UsersDto) {
    return await this.userService.createUser(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('forgot-password')
  async forgetPassword(
    @Body() body: { email: string }
  ) {
    if(!body?.email) throw new BadRequestException('EMAIL_IS_REQUIRED');
    return await this.authService.forgotPassword(body?.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.token, body.password);
  }

}
