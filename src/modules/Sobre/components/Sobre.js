import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

export class Sobre extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('Title', 'Sobre'),
  });

  async componentDidMount() {
    await this.props.navigation.setParams({
      Title: 'Sobre',
    });
  }
  render() {
    return (
      <View>
        <Text> Sobre </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sobre);
