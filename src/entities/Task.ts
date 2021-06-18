import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm";
import { Board } from "./Board";
import { BoardColumn } from "./BoardColumn";
import { User } from "./User";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: "TITLE" })
    title: string;

    @Column({ default: 0 })
    order: number;

    @Column({ default: "DESCRIPTION" })
    description: string;

    @OneToOne(() => User, {
      onDelete: "SET NULL",
      eager: true,
    })
    @JoinColumn()
    user: User;

    @OneToOne(() => Board, {
      onDelete: "CASCADE",
      eager: true,
    })
    @JoinColumn()
    board: User;

    @OneToOne(() => BoardColumn, {
      eager: true,
    })
    @JoinColumn()
    column: BoardColumn;

}
