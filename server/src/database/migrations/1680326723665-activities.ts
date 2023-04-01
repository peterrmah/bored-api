import { MigrationInterface, QueryRunner } from "typeorm";

export class activities1680326723665 implements MigrationInterface {
  name = "activities1680326723665";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`activities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`price\` enum ('Free', 'Low', 'High') NOT NULL, \`accessibility\` enum ('Free', 'Low', 'High') NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`activities\``);
  }
}
