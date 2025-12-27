import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogSlider } from './blog-slider.entity';
import { BlogSliderDto } from './blog-slider.dto';

@Injectable()
export class BlogSliderService {

  constructor(
    @InjectRepository(BlogSlider)
    private sliderRepository: Repository<BlogSlider>,
  ) {}

  async create(dto: BlogSliderDto): Promise<BlogSlider> {
    try {
      const slider = this.sliderRepository.create(dto);
      return await this.sliderRepository.save(slider);
    } catch (error) {
      throw new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<BlogSlider[]> {
    try {
      return await this.sliderRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<BlogSlider> {
    try {
      const slider = await this.sliderRepository.findOne({ where: { id } });

      if (!slider) {
        throw new HttpException('Slider not found', HttpStatus.NOT_FOUND);
      }

      return slider;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, dto: BlogSliderDto): Promise<BlogSlider> {
    try {
      const slider = await this.findOne(id);
      Object.assign(slider, dto);
      return await this.sliderRepository.save(slider);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<{ status: boolean }> {
    try {
      const slider = await this.findOne(id);
      await this.sliderRepository.remove(slider);
      return { status: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
