import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AlterforeginkeyUserIdOnTablePets1594323125811
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'pets',
      new TableForeignKey({
        name: 'IdUser', // Tabela aonde ira receber a chave estrangeira
        columnNames: ['userId'], // Aqui referencia a tabela de pets, na qual tem essa chave primaria
        referencedColumnNames: ['id'], // Aqui diz que estou pegando referenciando o id da tabela de users
        referencedTableName: 'users', // Aqui referencia a tabela
        onDelete: 'CASCADE', // deletou o user deleta todos os pets que ele cadastrou, se deletar ele, deleta todas as refrencias
        onUpdate: 'CASCADE', // Aqui se atualizar o id do User deleta tudo o que tinha referencia dele.
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pets', 'IdUser');
  }
}
