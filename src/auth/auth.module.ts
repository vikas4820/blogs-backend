import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/components/user/user.module';
import { MailModule } from 'src/utilities/mail/mail.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_RESET_SECRET || 'super_secure_reset_secret',
      signOptions: { expiresIn: '60m' },
    }),
    forwardRef(() => UserModule),
    MailModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
