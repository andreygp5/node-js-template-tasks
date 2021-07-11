import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity()
export class BoardColumn extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: 'TITLE' })
    title: string;

    @Column({ default: 0 })
    order: number;

    @ManyToOne(() => Board, (board) => board.columns)
    board: Board;
}
