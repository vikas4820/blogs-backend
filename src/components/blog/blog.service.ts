import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BlogsCategoriesDto } from '../blog-category/blog-category.dto';
import { Blogs } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
    constructor(
    ) {}


}
