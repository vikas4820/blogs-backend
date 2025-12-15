import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlogsCategoriesDto } from './blog-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blogs } from '../blog/blog.entity';
import { Repository } from 'typeorm';
import { BlogsCategories } from './blog-category.entity';

@Injectable()
export class BlogCategoryService {

    constructor(
        @InjectRepository(BlogsCategories) private blogsCategoryRepository: Repository<BlogsCategories>
    ) {}

    async create(createBlogDto: BlogsCategoriesDto): Promise<BlogsCategories> {
        try {
            const category = this.blogsCategoryRepository.create(createBlogDto);
            return await this.blogsCategoryRepository.save(category);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new HttpException(
                    'Blog category already exists',
                    HttpStatus.CONFLICT,
                );
            }
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async findAll(): Promise<BlogsCategories[]> {
        try {
            return await this.blogsCategoryRepository.find();
        } catch (error) {
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
