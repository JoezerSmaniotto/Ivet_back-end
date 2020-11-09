/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; // Para dizer que este Appointment esta relacionado com Uma tabela no banco de dados
// Desta forma importo uma Entity = E N T I D A D E ! ! !
// Esta me diz que vai ser algo que vai ser salvo no banco de dados

import User from './User';

// @Entity('pets') passo o pets q é nome da tabela // eslint-disable-next-line camelcase
@Entity('pets') // O decoratior funciona como se fosse uma função, e como paramentro da função ele envia a classe abaixo dele como um Paramento
class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User) // Aqui coloca uma função que informa qual model deve retornar quando uma variavel for chamada no caso retorna user.
  @JoinColumn({ name: 'userId' }) // Aqui informa qual a coluna que irá identificar qual é o dono deste pet.
  user: User;

  @Column()
  namePet: string;

  @Column()
  racaPet: string;

  @Column()
  sexo: string;

  @Column()
  dataNasc: Date;

  @Column()
  observacao: string;

  @Column()
  img: string;

  // // 1 - Muitos
  // @ManyToOne(() => User) // Aqui coloco uma funcão que retorno o model usado, quando essa variavel for chamada
  // @JoinColumn({ name: 'provider_id' }) // Aqui estou identificando qual a columa que irá identicar qual é o prestador deste agendamento
  // provder: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pet;
