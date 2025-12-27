import { Test, TestingModule } from '@nestjs/testing';
import { BlogTestimonialService } from './blog-testimonial.service';

describe('BlogTestimonialService', () => {
  let service: BlogTestimonialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogTestimonialService],
    }).compile();

    service = module.get<BlogTestimonialService>(BlogTestimonialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
