import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  containerInfo: {height: '100%', paddingLeft: '5%', paddingRight: '5%'},

  textTitulo: {
    color: '#081690',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  textSecundario: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    marginTop: 15,
    paddingBottom: 0,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  containerCheckbox: {
    flexDirection: 'row',
    paddingRight: '6%',
    alignItems: 'center',
    marginTop: 15,
  },
  textCheckbox: {marginLeft: '4%'},
  containerAvancar: {position: 'absolute', bottom: 0, width: '100%'},
  enableAvancar: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#081690',
    height: 50,
    justifyContent: 'center',
  },
  disableAvancar: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#DFDFDF',
    height: 50,
    justifyContent: 'center',
  },
  textAvancar: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textDisableAvancar: {
    color: '#AAAAAA',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
