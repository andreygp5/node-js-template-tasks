import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany,
} from 'typeorm';
import { BoardColumn } from '../../columns/entities/column.entity';

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 'TITLE' })
    title: string;

    @Column({ default: 'TITLE' })
    titleRE: string;

    @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board, {
      onDelete: 'CASCADE',
      cascade: true,
      eager: true,
    })
    columns: BoardColumn[];
}
