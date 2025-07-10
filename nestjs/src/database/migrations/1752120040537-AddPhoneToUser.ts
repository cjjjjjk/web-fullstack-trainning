import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneToUser1752120040537 implements MigrationInterface {
    name = 'AddPhoneToUser1752120040537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
    }

}
