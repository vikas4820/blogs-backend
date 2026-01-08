import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BlogsCategoriesDto } from '../blog-category/blog-category.dto';
import { Blogs } from './blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { BlogsCategories } from '../blog-category/blog-category.entity';
import { Users } from '../user/users.entity';
import { sharpImageToWebP } from 'src/helpers/image-upload.util';
import * as fs from 'fs';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blogs) private blogsRepository: Repository<Blogs>,
    @InjectRepository(BlogsCategories)
    private blogCategoryRepository: Repository<BlogsCategories>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async findAll(
    roles: string[],
    userId: number,
    page = 1,
    limit = 5,
  ) {
    try {
      const skip = (page - 1) * limit;
  
      const query: any = {
        relations: ['user', 'blogCategory'],
        order: { createdAt: 'DESC' },
        skip,
        take: limit,
      };
  
      if (!roles.includes('admin')) {
        query.where = {
          user: { id: userId }, 
        };
      }
  
      const [data, total] =
        await this.blogsRepository.findAndCount(query);
  
      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async findAllPublic(
    page = 1,
    limit = 5,
  ) {
    try {
      const skip = (page - 1) * limit;
  
      const query: any = {
        relations: ['user', 'blogCategory'],
        order: { createdAt: 'DESC' },
        skip,
        take: limit,
      };
  
      const [data, total] = await this.blogsRepository.findAndCount(query);
  
      return {
        data,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllCount(
    roles: string[],
    userId: number,
  ): Promise<{
    all: number;
    active: number;
    inactive: number;
  }> {
    try {
      const baseWhere: any = {};
  
      if (!roles.includes('admin')) {
        baseWhere.user = { id: userId };
      }
  
      const all = await this.blogsRepository.count({
        where: baseWhere,
      });
  
      const active = await this.blogsRepository.count({
        where: {
          ...baseWhere,
          status: 'active',
        },
      });
  
      const inactive = await this.blogsRepository.count({
        where: {
          ...baseWhere,
          status: 'inactive',
        },
      });
  
      return { all, active, inactive };
    } catch (error) {
      throw new HttpException(
        error?.message || 'Error retrieving blog counts',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  async findOne(id: number): Promise<Blogs | null> {
    try {
      return await this.blogsRepository.findOne({
        where: { id: id },
        relations: ['user', 'blogCategory'],
      });
    } catch (error) {
      throw new HttpException(
        `${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(dto: CreateBlogDto, images: Express.Multer.File[]) {
    const category = await this.blogCategoryRepository.findOne({
      where: { id: dto.blogCategory },
    });

    if (!category) {
      throw new HttpException('Invalid category', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({
      where: { id: dto.user },
    });

    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    const imagePaths: string[] = [];

    if (images?.length) {
      for (const image of images) {
        const fileName = await sharpImageToWebP(
          image,
          1200,
          1200,
          './uploads/blogs',
        );
        imagePaths.push(fileName);
      }
    }

    try {
      const blog = new Blogs();
      blog.title = dto.title;
      blog.slug = dto.slug;
      blog.shortDescription = dto.shortDescription;
      blog.content = dto.content;
      blog.metaTitle = dto.metaTitle || '';
      blog.metaDescription = dto.metaDescription || '';
      blog.status = dto.status || 'draft';
      blog.blogCategory = category;
      blog.user = user;
      blog.images = imagePaths;

      return await this.blogsRepository.save(blog);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    dto: UpdateBlogDto,
    images: Express.Multer.File[],
  ): Promise<Blogs> {
    try {
      const blog = await this.blogsRepository.findOne({
        where: { id },
        relations: ['blogCategory', 'user'],
      });

      if (!blog) {
        throw new NotFoundException('Blog not found');
      }

      /* -------- Remove Images -------- */
      if (dto.removedImages && dto.removedImages.length > 0) {
        blog.images = blog.images.filter(
          (img) => !dto.removedImages!.includes(img),
        );

        for (const img of dto.removedImages) {
          const filePath = `./uploads/blogs/${img}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }

      /* -------- Add New Images -------- */
      if (images?.length) {
        if(blog.images == null || !blog.images?.length) {
            blog.images = [];
        }
        console.log("blog.images", blog.images)
        for (const image of images) {
          const webp = await sharpImageToWebP(
            image,
            1200,
            1200,
            './uploads/blogs',
          );
          blog.images.push(webp);
        }
      }

      /* -------- Update Category -------- */
      if (dto.blogCategory) {
        const category = await this.blogCategoryRepository.findOne({
          where: { id: dto.blogCategory },
        });

        if (!category) {
          throw new HttpException('Invalid category', HttpStatus.BAD_REQUEST);
        }

        blog.blogCategory = category;
      }

      /* -------- Update User -------- */
      if (dto.user) {
        const user = await this.userRepository.findOne({
          where: { id: dto.user },
        });

        if (!user) {
          throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
        }

        blog.user = user;
      }

      /* -------- Update Scalar Fields -------- */
      if (dto.title !== undefined) blog.title = dto.title;
      if (dto.slug !== undefined) blog.slug = dto.slug;
      if (dto.shortDescription !== undefined)
        blog.shortDescription = dto.shortDescription;
      if (dto.content !== undefined) blog.content = dto.content;
      if (dto.metaTitle !== undefined) blog.metaTitle = dto.metaTitle;
      if (dto.metaDescription !== undefined)
        blog.metaDescription = dto.metaDescription;
      if (dto.status !== undefined) blog.status = dto.status;

      return await this.blogsRepository.save(blog);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Failed to update blog',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<{ success: boolean; message: string }> {
    try {
      // Find the blog first
      const blog = await this.blogsRepository.findOne({ where: { id } });

      if (!blog) {
        throw new NotFoundException(`Blog with id ${id} not found`);
      }

      // Delete all associated images from disk
      if (blog.images?.length) {
        for (const img of blog.images) {
          try {
            const filePath = `./uploads/blogs/${img}`;
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          } catch (err) {
            console.error(`Failed to delete image ${img}:`, err.message);
            // Continue deleting other images even if one fails
          }
        }
      }

      // Delete the blog from DB
      const deleteResult = await this.blogsRepository.delete(id);

      if (deleteResult.affected && deleteResult.affected > 0) {
        return {
          success: true,
          message: `Blog with id ${id} deleted successfully`,
        };
      } else {
        throw new HttpException(
          `Failed to delete blog with id ${id}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      // Catch any unexpected error
      throw new HttpException(
        error?.message || 'Failed to delete blog',
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
