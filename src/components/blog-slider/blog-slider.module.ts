import { Module } from '@nestjs/common';
import { BlogSliderService } from './blog-slider.service';
import { BlogSliderController } from './blog-slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogSlider } from './blog-slider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BlogSlider
    ])
  ],
  controllers: [BlogSliderController],
  providers: [BlogSliderService],
})
export class BlogSliderModule {}
