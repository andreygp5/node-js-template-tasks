import {MigrationInterface, QueryRunner} from "typeorm";

export class User1625606415913 implements MigrationInterface {
    name = 'User1625606415913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT 'USER_FIRST_NAME', "login" character varying NOT NULL DEFAULT 'user-login', "salt" character varying NOT NULL, "password" character varying NOT NULL DEFAULT 'USER_PASSWORD', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
