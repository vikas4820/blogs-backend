import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BlogsCategories } from '../blog-category/blog-category.entity';
import { Users } from '../user/users.entity';

@Entity('blogs')
export class Blogs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ length: 220, unique: true })
  slug: string;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ nullable: true })
  featuredImage: string;

  @Column({ length: 200, nullable: true })
  metaTitle: string;

  @Column({ type: 'text', nullable: true })
  metaDescription: string;

  @Column({
    type: 'enum',
    enum: ['active', 'draft', 'inactive'],
    default: 'active',
  })
  status: 'active' | 'draft' | 'inactive';

  @ManyToOne(() => BlogsCategories, (category) => category.blogs, { eager: true })
  blogCategory: BlogsCategories;

  @ManyToOne(() => Users, (user) => user.blogs, { eager: true })
  user: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
