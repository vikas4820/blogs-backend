import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsInt, IsOptional, IsEnum } from 'class-validator';
export class CreateBlogDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(200, { message: 'Title cannot exceed 200 characters' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug is required' })
  @MaxLength(220, { message: 'Slug cannot exceed 220 characters' })
  slug: string;

  @IsInt({ message: 'Category ID must be an integer' })
  @IsNotEmpty({ message: 'Category ID is required' })
  categoryId: number;

  @IsString()
  @IsNotEmpty({ message: 'Short description is required' })
  shortDescription: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  content: string;

  @IsString()
  @IsOptional()
  featuredImage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Meta title cannot exceed 200 characters' })
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsEnum(['active', 'draft', 'inactive'], { message: 'Status must be active, draft or inactive' })
  @IsOptional()
  status?: 'active' | 'draft' | 'inactive';
}

export class UpdateBlogDto {
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Title cannot exceed 200 characters' })
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(220, { message: 'Slug cannot exceed 220 characters' })
  slug?: string;

  @IsInt({ message: 'Category ID must be an integer' })
  @IsOptional()
  categoryId?: number;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  featuredImage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200, { message: 'Meta title cannot exceed 200 characters' })
  metaTitle?: string;

  @IsString()
  @IsOptional()
  metaDescription?: string;

  @IsEnum(['active', 'draft', 'inactive'], { message: 'Status must be active, draft or inactive' })
  @IsOptional()
  status?: 'active' | 'draft' | 'inactive';
}

