import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
  container: {flex: 1, flexDirection: 'column', backgroundColor: 'black'},
  camera: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  container_load: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  imagemProduto: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  containerInfo: {
    width: screenWidth / 2,
    flexDirection: 'row',
  },
  nomeProduto: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 20,
  },
  containerTexto: {
    width: screenWidth / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
