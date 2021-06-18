import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Board } from "./Board";

@Entity()
export class BoardColumn extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: "TITLE" })
    title: string;
  
    @Column({ default: 0 })
    order: number;

    @ManyToOne(() => Board, board => board.columns)
    board: Board;
    
}
