import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

class App extends Component {
  render() {
    return <Text style={styles.center}> Firebase ready! </Text>;
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
