import {MigrationInterface, QueryRunner} from "typeorm";

export class Tasks1625911668322 implements MigrationInterface {
    name = 'Tasks1625911668322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL DEFAULT 'TITLE', "order" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL DEFAULT 'DESCRIPTION', "userId" text, "boardId" text, "columnId" text, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
