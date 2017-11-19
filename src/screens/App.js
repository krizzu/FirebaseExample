import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import Login from './Login';
import CreateUser from './CreateUser';
import Home from './Home';

import { auth } from '../firebase/auth';

class App extends Component {
  state = {
    path: '/',
    userLoggedIn: null,
  };

  componentDidMount() {
    this._removeListener = auth.onAuthStateChanged(user => {
      this.setState(() => ({
        userLoggedIn: !!user,
      }));
    });
  }

  componentWillUnmount() {
    this._removeListener && this._removeListener();
  }

  _handleRouteChange = route => {
    this.setState(() => ({
      path: route,
    }));
  };

  render() {
    const { path, userLoggedIn } = this.state;

    switch (path) {
      case '/createUser': {
        return <CreateUser changeRoute={this._handleRouteChange} />;
      }
      case '/login': {
        if (userLoggedIn === null) return null;
        return userLoggedIn ? (
          <Home changeRoute={this._handleRouteChange} />
        ) : (
          <Login changeRoute={this._handleRouteChange} />
        );
      }
      default:
        null;
    }

    return (
      <View style={styles.center}>
        <Button
          title="Create user"
          onPress={() => this._handleRouteChange('/createUser')}
        />
        <Button
          title="Login"
          onPress={() => this._handleRouteChange('/login')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
