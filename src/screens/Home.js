import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { logoutUser } from '../firebase/auth';

import BackButton from '../components/BackButton';

class Home extends Component {
  state = {
    error: '',
  };

  _handleLogOut = async () => {
    try {
      await logoutUser();
    } catch (e) {
      this.setState(() => ({
        error: e,
      }));
      return;
    }

    this.props.changeRoute('/');
  };

  render() {
    const { error } = this.state;
    return (
      <View style={styles.container}>
        <BackButton goBack={this._handleLogOut} title="Logout" />
        <Text>Welcome to Home</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Home;
