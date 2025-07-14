import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1752460874116 implements MigrationInterface {
    name = 'SchemaUpdate1752460874116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`admin_content\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`admin_content\``);
    }

}
