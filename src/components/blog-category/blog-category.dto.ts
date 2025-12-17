import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from 'class-validator';

export class BlogsCategoriesDto {
  @IsString({ message: 'Category name must be a string' })
  @IsNotEmpty({ message: 'Category name is required' })
  @MinLength(3, { message: 'Category name must be at least 3 characters long' })
  @MaxLength(20, { message: 'Category name must not exceed 20 characters' })
  categoryName: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsString({ message: 'Status must be a string' })
  @IsNotEmpty({ message: 'Status is required' })
  status: string;

}
