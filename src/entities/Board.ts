import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { BoardColumn } from "./BoardColumn";

@Entity()
export class Board extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: "TITLE" })
    title: string;

    @OneToMany(() => BoardColumn, boardColumn => boardColumn.board, {
        onDelete: "CASCADE",
        cascade: true,
    })
    columns: BoardColumn[];

}
