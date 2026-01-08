import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from './users.entity';
import { JwtAuthGuard } from 'src/guards/roles/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async findAll(): Promise<Users[]> {
    return await this.userService.findAll();
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async getAllCount(): Promise<{ all: number, active: number, inactive: number }> {
    return await this.userService.getAllCount();
  }
}
