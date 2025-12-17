import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlogsCategoriesDto } from '../blog-category/blog-category.dto';
import { Blogs } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>
    ) {}

    async findAll(): Promise<Blogs[]> {
        try {
            return await this.blogsRepository.find();
        } catch (error) {
            throw new HttpException(
                `${error?.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async getAllCount(): Promise<{ all: number, active: number, inactive: number }> {
        try {
            const allCount = await this.blogsRepository.count();
            const activeCount = await this.blogsRepository.count({ where: { status: 'active' } });
            const inactiveCount = await this.blogsRepository.count({ where: { status: 'inactive' } });
            return { all: allCount, active: activeCount, inactive: inactiveCount };
        } catch (error) {
            throw new HttpException(
                `${error?.message || 'Error retrieving blog category counts'}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
