import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import { Roles } from './roles.entity';
import { LoginDto } from 'src/auth/login.dto';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>,
  ) {}

  async createUser(userDto: UsersDto): Promise<Users | null> {
    try {
      const defaultRole = await this.rolesRepository.findOne({
        where: { name: 'user' },
      });

      if (!defaultRole) {
        throw new HttpException(
          'Default role not found',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const user = this.usersRepository.create({
        ...userDto,
        role: defaultRole,
      });

      const savedUser = await this.usersRepository.save(user);

      return await this.usersRepository.findOne({
        where: { id: savedUser.id },
      });
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Username or email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        `${error?.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { usernameOrEmail, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: [
        { username: usernameOrEmail },
        { email: usernameOrEmail },
      ],
    });

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { username: user.username, sub: user.id };
    const access_token = this.authService.generateJwtToken(payload);

    return { access_token };
  }
}
