import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: "USER_FIRST_NAME" })
    name: string;

    @Column({ default: "user-login" })
    login: string;

    @Column()
    salt: string;

    @Column({ default: "USER_PASSWORD" })
    password: string;
    
}
