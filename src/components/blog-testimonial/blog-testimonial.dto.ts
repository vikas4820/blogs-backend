import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class BlogTestimonialDto {

  @IsString({ message: 'Client name must be a string' })
  @IsNotEmpty({ message: 'Client name is required' })
  clientName: string;

  @IsOptional()
  @IsString({ message: 'Message must be a string' })
  message?: string;

  @IsOptional()
  @IsString({ message: 'Image path must be a string' })
  imagePath?: string;

  @IsOptional()
  @IsInt({ message: 'Sort order must be a number' })
  @Min(0)
  sortOrder?: number;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;
}
