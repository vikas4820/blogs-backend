import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Roles } from './roles.entity';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsInt, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Blogs } from '../blog/blog.entity';

@Entity('users')
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username must not exceed 20 characters' })
  username: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Column()
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ManyToOne(() => Roles, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  @IsOptional() 
  role: Roles;

  @OneToMany(() => Blogs, (blog) => blog.user)
  blogs: Blogs[];

  @CreateDateColumn()
  @Exclude() 
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude() 
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude() 
  deletedAt: Date | null;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
