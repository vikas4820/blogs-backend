import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './users.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<Users[]> {
    return await this.userService.findAll();
  }

  @Get('count')
  async getAllCount(): Promise<{ all: number, active: number, inactive: number }> {
    return await this.userService.getAllCount();
  }
}
