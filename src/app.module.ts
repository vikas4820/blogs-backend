import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './components/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from './settings/settings.module';
import { BlogCategoryModule } from './components/blog-category/blog-category.module';
import { BlogModule } from './components/blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blog_management',
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
