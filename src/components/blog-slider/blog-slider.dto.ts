import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsInt,
  Min,
} from 'class-validator';

export class BlogSliderDto {

  @IsString({ message: 'Heading must be a string' })
  @IsNotEmpty({ message: 'Heading is required' })
  heading: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Button text must be a string' })
  buttonText?: string;

  @IsOptional()
  // @IsUrl({}, { message: 'Button URL must be a valid URL' })
  buttonUrl?: string;

  @IsOptional()
  @IsString({ message: 'Image path must be a string' })
  imagePath?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;
}
