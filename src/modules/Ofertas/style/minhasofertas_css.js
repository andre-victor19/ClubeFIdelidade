import {StyleSheet} from 'react-native';
import {HEIGHT} from '../../../utils/helpers/Contants';

export default StyleSheet.create({
  container: {flex: 1},
  horizontal: {
    justifyContent: 'space-around',
    padding: 10,
    marginTop: '50%',
  },
  textSecundario: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
  container_botao: {marginTop: 50},
  sem_oferta: {
    height: HEIGHT / 1.5,
    justifyContent: 'center',
  },
  sem_oferta_texto: {
    textAlign: 'center',
    fontSize: 20,
    color: 'gray',
  },
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
