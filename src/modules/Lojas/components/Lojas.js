import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getCoordinates} from '../../../utils/helpers/Functions';
import ItemLoja from './ItemLoja';
import style from '../style/lojas_css';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const DATA = [
  {
    id: '01',
    nome: 'Eunápolis - Centro',
    lat: '-16.3729087',
    lng: '-39.5847625',
  },
  {
    id: '02',
    nome: 'Eunápolis - Centauro',
    lat: '-16.3668392',
    lng: '-39.5875807',
  },
  {
    id: '03',
    nome: 'Ilhéus - Malhado',
    lat: '-14.7935051',
    lng: '-39.0463797',
  },
  {
    id: '04',
    nome: 'Eunápolis - Centro',
    lat: '-16.3729087',
    lng: '-39.5847625',
  },
  {
    id: '05',
    nome: 'Eunápolis - Centauro',
    lat: '-16.3668392',
    lng: '-39.5875807',
  },
  {
    id: '06',
    nome: 'Ilhéus - Malhado',
    lat: '-14.7935051',
    lng: '-39.0463797',
  },
];

class Lojas extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('Title', 'Lojas'),
  });
  state = {
    ativo: 1,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034,
    },
    origin: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034,
    },
    distance: 0,
    duration: 0,
  };

  async componentDidMount() {
    try {
      await this.props.navigation.setParams({
        Title: 'Lojas',
      });
      const coordinates = await getCoordinates();
      this.setState({
        origin: {
          ...this.state.region,
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {region, ativo, origin, distance, duration} = this.state;
    return (
      <>
        <View style={style.containerLista}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={DATA}
            renderItem={({item, index}) => (
              <ItemLoja
                {...item}
                ativo={ativo === parseInt(item.id, 10)}
                onSelect={({region, index}) =>
                  this.setState({
                    region: {...region},
                    ativo: index,
                  })
                }
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}>
            {/* <MapViewDirections
              precision="high"
              strokeWidth={3}
              strokeColor="#bf0029"
              language="pt-BR"
              origin={origin}
              destination={region}
              apikey={GOOGLE_MAPS_APIKEY}
              onReady={result =>
                this.setState({
                  distance: result.distance,
                  duration: result.duration,
                })
              }
            /> */}
            <Marker
              icon={{
                uri:
                  'https://datasalesio-imagens.s3.amazonaws.com/icon_map.png',
                height: 40,
                width: 40,
              }}
              coordinate={region}
            />
          </MapView>
        </View>
        <View style={style.containerFooter}>
          {/* <View>
            <Text>Distância: {parseFloat(distance).toFixed(2)} km.</Text>
            <Text>Tempo de percurso: {timeConvert(duration)}</Text>
          </View> */}
          <View style={{width: '75%'}}>
            <Text style={{color: 'gray'}}>
              Visualize a distância em que você está de um dos nossos
              supermercados.
            </Text>
          </View>
          <TouchableWithoutFeedback
            disabled={!origin}
            onPress={() =>
              getDirections({source: origin, destination: region})
            }>
            <View style={style.botaoRotas}>
              <Icon name="route" size={20} color="#fff" />
              <Text style={style.textoBotao}>Rotas</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Lojas);
