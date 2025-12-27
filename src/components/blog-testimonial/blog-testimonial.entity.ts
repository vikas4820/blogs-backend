import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BlogTestimonial extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  clientName: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imagePath: string;

  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
