import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSalt1624276704144 implements MigrationInterface {
    name = 'AddSalt1624276704144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    }

}
