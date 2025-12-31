import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './components/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from './settings/settings.module';
import { BlogCategoryModule } from './components/blog-category/blog-category.module';
import { BlogModule } from './components/blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { BlogSliderModule } from './components/blog-slider/blog-slider.module';
import { BlogTestimonialModule } from './components/blog-testimonial/blog-testimonial.module';
import { MailModule } from './utilities/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQLHOST || process.env.DB_HOST,
      port: process.env.MYSQLPORT ? parseInt(process.env.MYSQLPORT, 10) : Number(process.env.DB_PORT) || 3306,
      username: process.env.MYSQLUSER || process.env.DB_USERNAME,
      password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
      database: process.env.MYSQL_DATABASE || process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      //logging: true,
    }),
    AuthModule,
    UserModule,
    SettingsModule,
    BlogCategoryModule,
    BlogModule,
    BlogSliderModule,
    BlogTestimonialModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
