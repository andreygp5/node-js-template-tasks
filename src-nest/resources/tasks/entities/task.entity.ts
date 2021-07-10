import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'TITLE' })
  title: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: 'DESCRIPTION' })
  description: string;

  @Column({ type: 'text', nullable: true })
  userId: string | null;

  @Column({ type: 'text', nullable: true })
  boardId: string | null;

  @Column({ type: 'text', nullable: true })
  columnId: string | null;
}
