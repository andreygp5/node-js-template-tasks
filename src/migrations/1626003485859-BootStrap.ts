import { MigrationInterface, QueryRunner } from 'typeorm';

export class BootStrap1626003485859 implements MigrationInterface {
    name = 'BootStrap1626003485859'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "board_column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL DEFAULT \'TITLE\', "order" integer NOT NULL DEFAULT \'0\', "boardId" uuid, CONSTRAINT "PK_0273ece23af9b3e55ad6af2fdaa" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL DEFAULT \'TITLE\', "titleRE" character varying NOT NULL DEFAULT \'TITLE\', CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL DEFAULT \'TITLE\', "order" integer NOT NULL DEFAULT \'0\', "description" character varying NOT NULL DEFAULT \'DESCRIPTION\', "userId" text, "boardId" text, "columnId" text, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT \'USER_FIRST_NAME\', "login" character varying NOT NULL DEFAULT \'user-login\', "salt" character varying NOT NULL, "password" character varying NOT NULL DEFAULT \'USER_PASSWORD\', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
      await queryRunner.query('ALTER TABLE "board_column" ADD CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "board_column" DROP CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72"');
      await queryRunner.query('DROP TABLE "user"');
      await queryRunner.query('DROP TABLE "task"');
      await queryRunner.query('DROP TABLE "board"');
      await queryRunner.query('DROP TABLE "board_column"');
    }
}
