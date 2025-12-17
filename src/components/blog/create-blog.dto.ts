import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBlogDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(5, { message: 'Title must be at least 5 characters long' })
  title: string;

  @IsString({ message: 'Slug must be a string' })
  @IsNotEmpty({ message: 'Slug is required' })
  slug: string;

  @IsInt({ message: 'Category must be a valid ID' })
  @IsNotEmpty({ message: 'Category is required' })
  categoryId: number;

  @IsInt({ message: 'Author must be a valid user ID' })
  @IsNotEmpty({ message: 'Author is required' })
  authorId: number;

  @IsString({ message: 'Short description must be a string' })
  @IsNotEmpty({ message: 'Short description is required' })
  shortDescription: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsOptional()
  @IsString({ message: 'Featured image must be a string' })
  featuredImage?: string;

  @IsOptional()
  @IsString({ message: 'Meta title must be a string' })
  @MaxLength(200)
  metaTitle?: string;

  @IsOptional()
  @IsString({ message: 'Meta description must be a string' })
  metaDescription?: string;

  @IsEnum(['active', 'draft', 'inactive'], {
    message: 'Status must be active, draft or inactive',
  })
  status: 'active' | 'draft' | 'inactive';
}
