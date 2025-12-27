import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BlogSliderService } from './blog-slider.service';
import { BlogSliderDto } from './blog-slider.dto';
import { BlogSlider } from './blog-slider.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('blog-slider')
export class BlogSliderController {
  constructor(private readonly sliderService: BlogSliderService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/sliders',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new HttpException(
              'Only image files allowed',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: BlogSliderDto,
  ): Promise<BlogSlider> {
    if (!image) {
      throw new HttpException(
        'Slider image is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    dto.imagePath = `/uploads/sliders/${image.filename}`;

    return await this.sliderService.create(dto);
  }

  @Get()
  async findAll(): Promise<BlogSlider[]> {
    return await this.sliderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<BlogSlider> {
    return await this.sliderService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: BlogSliderDto,
  ): Promise<BlogSlider> {
    return await this.sliderService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.sliderService.remove(id);
  }
}
