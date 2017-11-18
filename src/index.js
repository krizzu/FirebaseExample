import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';

import App from './screens/App';

export default class articleExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <App />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('articleExample', () => articleExample);
