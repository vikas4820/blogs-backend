import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsInt, IsOptional, IsEnum, IsArray } from 'class-validator';
import { BlogsCategories } from '../blog-category/blog-category.entity';
import { Users } from '../user/users.entity';
import { Type } from 'class-transformer';
// export class CreateBlogDto {
//   @IsString()
//   @IsNotEmpty({ message: 'Title is required' })
//   @MaxLength(200, { message: 'Title cannot exceed 200 characters' })
//   title: string;

//   @IsString()
//   @IsNotEmpty({ message: 'Slug is required' })
//   @MaxLength(220, { message: 'Slug cannot exceed 220 characters' })
//   slug: string;

//   @IsInt({ message: 'Category ID must be an integer' })
//   @IsNotEmpty({ message: 'Category ID is required' })
//   blogCategory: BlogsCategories;

//   @IsInt({ message: 'User ID must be an integer' })
//   @IsOptional()
//   user?: Users;

//   @IsString()
//   @IsNotEmpty({ message: 'Short description is required' })
//   shortDescription: string;

//   @IsString() 
//   @IsNotEmpty({ message: 'Content is required' })
//   content: string;

//   @IsString()
//   @IsOptional()
//   featuredImage?: string;

//   @IsString()
//   @IsOptional()
//   @MaxLength(200, { message: 'Meta title cannot exceed 200 characters' })
//   metaTitle?: string;

//   @IsString()
//   @IsOptional()
//   metaDescription?: string;

//   @IsEnum(['active', 'draft', 'inactive'], { message: 'Status must be active, draft or inactive' })
//   @IsOptional()
//   status?: 'active' | 'draft' | 'inactive';
// }

export class CreateBlogDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(220)
  slug: string;

  @Type(() => Number)
  @IsInt({ message: 'Category ID must be an integer' })
  blogCategory: number;  

  @Type(() => Number)
  @IsInt({ message: 'User ID must be an integer' })
  @IsOptional()
  user?: number;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsEnum(['active', 'draft', 'inactive'])
  @IsOptional()
  status?: 'active' | 'draft' | 'inactive';
}


export class UpdateBlogDto {

  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(220)
  slug?: string;

  @Type(() => Number)
  @IsInt({ message: 'Category ID must be an integer' })
  @IsOptional()
  blogCategory?: number;

  @Type(() => Number)
  @IsInt({ message: 'User ID must be an integer' })
  @IsOptional()
  user?: number;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsEnum(['active', 'draft', 'inactive'])
  @IsOptional()
  status?: 'active' | 'draft' | 'inactive';

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  removedImages?: string[];
}

