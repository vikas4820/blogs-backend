import { Test, TestingModule } from '@nestjs/testing';
import { BlogSliderController } from './blog-slider.controller';
import { BlogSliderService } from './blog-slider.service';

describe('BlogSliderController', () => {
  let controller: BlogSliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogSliderController],
      providers: [BlogSliderService],
    }).compile();

    controller = module.get<BlogSliderController>(BlogSliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
