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

    async findOne(id: number): Promise<BlogsCategories|null> {
        try {
            return await this.blogsCategoryRepository.findOne({
                where: { id: id }
            });
        } catch (error) {
            throw new HttpException(
                `${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    async update(id: number, updateBlogDto: BlogsCategoriesDto): Promise<BlogsCategories> {
        try {
            const category = await this.blogsCategoryRepository.findOne({
                where: { id: id },
            });
    
            if (!category) {
                throw new HttpException('Blog category not found', HttpStatus.NOT_FOUND);
            }
    
            Object.assign(category, updateBlogDto);
    
            return await this.blogsCategoryRepository.save(category);
        } catch (error) {
            throw new HttpException(
                `${error?.message || 'Error updating blog category'}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async removeCategory(id: number): Promise<{ status: boolean }> {
        try {
            const category = await this.blogsCategoryRepository.findOne({
                where: { id },
                relations: ['blogs'],
            });
    
            if (!category) {
                throw new HttpException('Blog category not found', HttpStatus.NOT_FOUND);
            }
    
            if (category.blogs && category.blogs.length > 0) {
                throw new HttpException(
                    'Cannot delete category, it is assigned to one or more blogs',
                    HttpStatus.FORBIDDEN,
                );
            }
    
            await this.blogsCategoryRepository.remove(category);
    
            return { status: true };
        } catch (error) {
            throw new HttpException(
                `${error?.message || 'Error deleting blog category'}`,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    
    
    async getAllCount(): Promise<{ all: number, active: number, inactive: number }> {
        try {
            const allCount = await this.blogsCategoryRepository.count();
            const activeCount = await this.blogsCategoryRepository.count({ where: { status: 'active' } });
            const inactiveCount = await this.blogsCategoryRepository.count({ where: { status: 'inactive' } });
            return { all: allCount, active: activeCount, inactive: inactiveCount };
        } catch (error) {
        throw new HttpException(
            `${error?.message || 'Error retrieving blog category counts'}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }
}
