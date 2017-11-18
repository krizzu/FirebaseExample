import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import BackButton from '../components/BackButton';
import ControlledInput from '../components/ControlledInput';
import ProceedButton from '../components/ProceedButton';

import { loginUser } from '../firebase/auth';

class Login extends Component {
  state = {
    login: '',
    password: '',
    error: '',
  };

  _goBack = () => {
    const { changeRoute } = this.props;
    changeRoute('/');
  };

  _handleInputChange = inputName => value => {
    this.setState(() => ({
      [inputName]: value,
    }));
  };

  _handleUserLogin = async () => {
    const { login, password } = this.state;

    try {
      const result = await loginUser(login, password);
      if (result) {
        this.props.changeRoute('/login');
      }
    } catch (e) {
      this.setState(() => ({
        error: e.message,
      }));
    }
  };

  render() {
    const { login, password, error, success } = this.state;
    return (
      <View style={styles.center}>
        <BackButton goBack={this._goBack} />
        <Text style={styles.bigText}>Login </Text>

        <ControlledInput
          onChange={this._handleInputChange('login')}
          title="Login"
          value={login}
        />
        <ControlledInput
          onChange={this._handleInputChange('password')}
          title="Password"
          value={password}
          isSecure
        />

        <ProceedButton handlePress={this._handleUserLogin} />

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  bigText: {
    fontSize: 32,
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
});

export default Login;
