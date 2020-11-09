import { EntityRepository, Repository } from 'typeorm';

import Pets from '../models/Pets';


@EntityRepository(Pets) // Passa o model como parametro no caso Pets
class PetsRepository extends Repository<Pets> {
  // Essa interface recebe por paramento o model do meu repositorio Repository<Pets> no caso o Pets
  // Aqui do extendes para o PetsRepository ter acesso aos metodos, como create, remove, all que tenho acesso atraves do Repository do typeorm
  public async findByName(namePet: string, userId: string): Promise<Pets | null> {
    // Como tranformeu o meotodo findByDate em uma função assincrona este metodo sera uma promisse por este motivo uso Promise<findPets | null> para dizer o retorno da PROMISE

    const findPets = await this.findOne({
      // FindOne é uma Promise o por isso uso o Async Await
      //where: { namePet }, // Como uso short syntax ficamos como esta  where: { dateBanco : dateOqueEstou passando Nalinha 9 }
      where: { namePet, userId }
    });
    return findPets || null; // Se tiver o findAppointment retorna, se não retorna null
  }
}

export default PetsRepository;
