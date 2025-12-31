import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/components/user/user.service';
import { Users } from 'src/components/user/users.entity';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/utilities/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  public generateJwtToken(payload): string {
    return this.jwtService.sign(payload);
  }

  public async forgotPassword(email: string) {
    const user: Users | null = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new HttpException(
        `USER_NOT_FOUND_WITH_EMAIL:${email}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const token = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        type: 'RESET_PASSWORD',
      },
      {
        secret: process.env.JWT_RESET_SECRET,
        expiresIn: '15m',
      },
    );

    const resetLink = `${process.env.BASE_FRONTEND_URL}/auth/reset-password?token=${token}`;

    const mailSent = await this.mailService.sendTemplateEmail(
      'reset-password',
      {
        email: user.email,
        resetLink,
        expiryMinutes: 15,
      },
      {
        to: user.email,
        subject: 'Reset Your Password',
      },
    );

    if (!mailSent) {
      console.error(`Password reset email failed for ${user.email}`);
    }

    return {
      statusCode: 200,
      message: 'Reset password link has been sent. Check you email',
    };
  } 

  async verifyResetToken(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_RESET_SECRET,
      });
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  async resetPassword(token: string, newPassword: string) {
    let payload: any;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_RESET_SECRET,
      });
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }

    // 2️⃣ Validate token type
    if (payload.type !== 'RESET_PASSWORD') {
      throw new BadRequestException('Invalid reset token');
    }

    // 3️⃣ Find user
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // 4️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5️⃣ Update password
    await this.userService.updatePassword(user.id, hashedPassword);

    return {
      message: 'Password has been reset successfully',
    };
  }
}
