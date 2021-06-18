import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { BoardColumn } from "./BoardColumn";

@Entity()
export class Board extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: "TITLE" })
    title: string;
  
    @OneToMany(() => BoardColumn, boardColumn => boardColumn.id)
    columns: BoardColumn[];
    
}
