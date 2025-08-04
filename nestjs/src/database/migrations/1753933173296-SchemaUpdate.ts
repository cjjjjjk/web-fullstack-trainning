import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1753933173296 implements MigrationInterface {
    name = 'SchemaUpdate1753933173296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`class\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_803bbfb4e9c41f0385a40bc219\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`classId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_bd5c8f2ef67394162384a484ba1\` FOREIGN KEY (\`classId\`) REFERENCES \`class\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_bd5c8f2ef67394162384a484ba1\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`classId\``);
        await queryRunner.query(`DROP INDEX \`IDX_803bbfb4e9c41f0385a40bc219\` ON \`class\``);
        await queryRunner.query(`DROP TABLE \`class\``);
    }

}
