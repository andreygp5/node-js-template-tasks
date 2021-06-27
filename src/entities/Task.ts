import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
// import { Board } from "./Board";
// import { BoardColumn } from "./BoardColumn";
// import { User } from "./User";

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

  @Column({ type: 'text', nullable: true })
  userId: string | null;

  @Column({ type: 'text', nullable: true })
  boardId: string | null;

  @Column({ type: 'text', nullable: true })
  columnId: string | null;

}

// interface ITask {
//   id: string,
//   title: string,
//   description: string,
//   order: number,
//   boardId: string | null,
//   columnId: string | null,
//   userId: string | null,
// }

// interface ITaskBody {
//   id: string,
//   title: string,
//   description: string,
//   order: number,
//   board: string | null,
//   column: string | null,
//   user: string | null,
// }

// export { ITask, ITaskBody };
