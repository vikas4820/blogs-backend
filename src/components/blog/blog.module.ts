import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blogs } from './blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Blogs
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService]
})
export class BlogModule {}
