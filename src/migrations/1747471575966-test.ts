import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1747471575966 implements MigrationInterface {
    name = 'Test1747471575966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "endpoint_stat" ("id" SERIAL NOT NULL, "endpoint" character varying NOT NULL, "count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_902d67d3571227c2db27ee6d2b8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "endpoint_stat"`);
    }

}
