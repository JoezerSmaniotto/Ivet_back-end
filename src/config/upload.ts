// Armazena as configurações do upload de imagem ou arquivos

import path from 'path'; // importo para trabalhar com o caminho do arquivo de upload
import crypto from 'crypto'; // Importo para gerar uma parte do nome aleatorio para arquivo qde upload
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // Usando dirname tenho, que vai se refirir ao diretorio que este arquivo esta

export default {
  directory: tmpFolder, // Assim posso usar a variavel para acessar o camaninho o "path" posso usar para deletar avatar quando faço A troca de avatar

  // armazano as imagens que o usuário fazer upload aqui dentro de pasta, mas depois altero
  // O diskStorage recebe duas propriedades destintion: onde será salvo & e o Filename, nome que arquivo vai receber
  storage: multer.diskStorage({
    destination: tmpFolder,
    // Usando dirname  eu tenho o caminho inteiro do meu computador ate a pastra config, agora
    // Separado por virgulas vou adicionando o proximos caminhos, contando que eu esteja no na pasta config
    filename(request, file, callback) {
      // Filename tem 3 propriedades request, file, e callback
      const fileHash = crypto.randomBytes(10).toString('hex'); // Faço isso para gerar uma parte do  nome do arquivo aleatorio, para nunca ter dois arquivos com o mesmo nome
      const fileName = `${fileHash}-${file.originalname}`; // Esse é nome original do arquivo file.originalname. agora junto a nome aleatorio com o nome do arquivo e iriei salvar, para evitar aquivos com nomes duplicados

      return callback(null, fileName); // passo dois Paramentos 1º Se ocorreu um erro passo o erro, como não ocorre passo null, e 2º paramentro o nome do arquivo
    },
  }),
};
