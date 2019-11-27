import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  listEmptyComponent: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listEmptyText: {
    marginTop: '70%',
    textAlign: 'center',
    fontSize: 16,
    color: '#263238',
  },
  scrollContainer: {paddingVertical: 10, paddingHorizontal: 20},
  containerLista: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerFlatList: {marginVertical: 0},
  tituloOferta: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
    width: screenWidth / 2,
  },
  imagemItem: {flex: 1, width: null, height: null},
  botaoVerMais: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textoBotaoVerMais: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#bf0029',
  },
  containerItem: {
    width: 220,
    height: 170,
    // borderColor: '#ddd',
    // borderRadius: 5,
    // borderWidth: 1,
    marginRight: 10,
  },
  containerInfo: {
    width: screenWidth / 2,
    flexDirection: 'row',
  },
  containerTexto: {
    width: screenWidth / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nomeProduto: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 20,
  },
  preco: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  preco_dois: {
    fontWeight: 'bold',
    color: '#32CD32',
    fontSize: 22,
  },
});
