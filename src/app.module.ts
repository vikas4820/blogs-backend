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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306, 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      //logging: true, 
    }),
    AuthModule,
    UserModule,
    SettingsModule,
    BlogCategoryModule,
    BlogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
