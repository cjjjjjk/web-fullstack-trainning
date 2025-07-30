import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1753671941100 implements MigrationInterface {
    name = 'SchemaUpdate1753671941100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`student\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`mssv\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_c9128b525d923ff221a241ee0e\` (\`mssv\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c9128b525d923ff221a241ee0e\` ON \`student\``);
        await queryRunner.query(`DROP TABLE \`student\``);
    }

}
