import axios from 'axios';
import {WSnackBar} from 'react-native-smart-tip';

const _snackBarOpts = {
  position: WSnackBar.position.BOTTOM, // 1.TOP 2.CENTER 3.BOTTOM
  duration: WSnackBar.duration.LONG, //1.SHORT 2.LONG 3.INDEFINITE
  textColor: '#FFF',
};

function limpa_formulário_cep(callback) {
  //Limpa valores do formulário de cep.
  callback('endereco', '');
  callback('bairro', '');
  callback('cidade', '');
  callback('uf', '');
}

function meu_callback(conteudo, callback) {
  if (!('erro' in conteudo)) {
    callback('endereco', conteudo.logradouro); //Atualiza os campos com os valores.
    callback('bairro', conteudo.bairro);
    callback('cidade', conteudo.localidade);
    callback('uf', conteudo.uf);
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep(callback);
    WSnackBar.show({
      ..._snackBarOpts,
      data: 'CEP não encontrado.',
      backgroundColor: '#bf0029',
    });
  }
}

function pesquisacep(valor, callback) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep !== '') {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.

      callback('endereco', 'Carregando...');
      callback('bairro', 'Carregando...');
      callback('cidade', 'Carregando...');
      callback('uf', 'Carregando...');
      //Cria um elemento javascript.
      //var script = document.createElement('script');

      //Insere script no documento e carrega o conteúdo.
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(resp => {
        if (!resp) {
          WSnackBar.show({
            ..._snackBarOpts,
            data: 'Digite um CEP válido.',
            backgroundColor: '#bf0029',
          });
          limpa_formulário_cep(callback);
        } else {
          meu_callback(resp.data, callback);
        }
      });
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep(callback);
      WSnackBar.show({
        ..._snackBarOpts,
        data: 'Formato de CEP inválido.',
        backgroundColor: '#bf0029',
      });
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    WSnackBar.show({
      ..._snackBarOpts,
      data: 'Digite um CEP válido.',
      backgroundColor: '#bf0029',
    });

    limpa_formulário_cep(callback);
  }
}

export default pesquisacep;
