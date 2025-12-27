import { Test, TestingModule } from '@nestjs/testing';
import { BlogSliderService } from './blog-slider.service';

describe('BlogSliderService', () => {
  let service: BlogSliderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogSliderService],
    }).compile();

    service = module.get<BlogSliderService>(BlogSliderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
