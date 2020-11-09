/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'; // Para dizer que este Appointment esta relacionado com Uma tabela no banco de dados
// Desta forma importo uma Entity = E N T I D A D E ! ! !
// Esta me diz que vai ser algo que vai ser salvo no banco de dados

// @Entity('appointments') passo o appointments q é nome da tabela
@Entity('users') // O decoratior funciona como se fosse uma função, e como paramentro da função ele envia a classe abaixo dele como um Paramento
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  birthDate: Date;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  UF: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
