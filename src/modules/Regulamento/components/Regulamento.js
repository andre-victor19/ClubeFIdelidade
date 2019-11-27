import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

export class Regulamento extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('Title', 'Regulamento'),
  });

  async componentDidMount() {
    await this.props.navigation.setParams({
      Title: 'Regulamento',
    });
  }

  render() {
    return (
      <View>
        <Text> Regulamento </Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Regulamento);
