import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePets1593985168128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pets',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'namePet',
            type: 'varchar',
          },
          {
            name: 'racaPet',
            type: 'varchar',
          },
          {
            name: 'sexo',
            type: 'varchar',
          },
          {
            name: 'dataNasc',
            type: 'timestamp',
          },
          {
            name: 'observacao',
            type: 'varchar',
          },
          {
            name: 'img',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pets');
  }
}
