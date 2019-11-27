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
  input: {
    paddingBottom: 0,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  containerLogo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
  },
  containerInput: {
    marginTop: '10%',
    paddingRight: '10%',
    paddingLeft: '10%',
  },
  containerBemVindo: {
    marginTop: '5%',
    paddingRight: '10%',
    paddingLeft: '10%',
  },
  containerText: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textBemVindo: {
    color: '#081690',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  textSecundario: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 16,
  },
  imageLogo: {
    width: 200,
    height: 100,
  },
  buttonLogin: {
    marginTop: 40,
  },
});
