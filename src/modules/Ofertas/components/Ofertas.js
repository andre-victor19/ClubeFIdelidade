import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StatusBar, Dimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import MinhasOfertas from './MinhasOfertas';
import PrecoDois from './PrecoDois';

export class Ofertas extends Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'Ofertas'},
      {key: 'second', title: 'Minhas ofertas'},
    ],
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#bf0029" barStyle="light-content" />
        <TabView
          navigationState={this.state}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return <PrecoDois {...this.props} />;
              case 'second':
                return <MinhasOfertas {...this.props} />;
              default:
                return null;
            }
          }}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{backgroundColor: '#bf0029'}}
              indicatorStyle={{backgroundColor: '#FFF'}}
            />
          )}
          onIndexChange={index => this.setState({index})}
          initialLayout={{width: Dimensions.get('window').width}}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Ofertas);
