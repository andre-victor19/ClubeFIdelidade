import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container_usuario: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  container_texto_lista: {flexDirection: 'row'},
  texto_lista: {marginLeft: 15, fontSize: 16, color: '#999'},
  container_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem_usuario: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  nome_usuario: {fontSize: 18},
  botao_cadastrar: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#999',
    color: '#999',
  },
  texto_secundario_botao: {fontSize: 16, color: '#999'},
  container_safe_area: {flex: 1},
  container_header: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  texto_header: {fontSize: 18, fontWeight: 'bold', color: '#999'},
  container_item: {paddingBottom: 15, paddingTop: 15},
  section: {paddingRight: 20},
});
