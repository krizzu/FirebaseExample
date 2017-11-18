import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import BackButton from '../components/BackButton';
import ControlledInput from '../components/ControlledInput';
import ProceedButton from '../components/ProceedButton';

import { createUser } from '../firebase/auth';

class CreateUser extends Component {
  state = {
    email: '',
    password: '',
    reEnteredPassword: '',
    error: '',
    success: '',
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

  _handleUserCreation = async () => {
    const { email, password, reEnteredPassword } = this.state;
    this.setState(() => ({
      error: '',
      success: '',
    }));

    if (password !== reEnteredPassword) {
      this.setState(() => ({
        error: 'Passwords are not the same!',
      }));
      return;
    }

    try {
      const result = await createUser(email, password);
      if (result) {
        this.setState(() => ({
          success: 'Successfully created an user!',
        }));
      }
    } catch (e) {
      this.setState(() => ({
        error: e.toString(),
        success: '',
      }));
    }
  };

  render() {
    const { email, password, reEnteredPassword, error, success } = this.state;
    return (
      <View style={styles.center}>
        <BackButton goBack={this._goBack} />

        <Text style={styles.bigText}>Create a user</Text>

        <ControlledInput
          onChange={this._handleInputChange('email')}
          title="Email"
          value={email}
        />

        <ControlledInput
          title="Password"
          value={password}
          onChange={this._handleInputChange('password')}
          isSecure
        />

        <ControlledInput
          title="Re-enter password"
          value={reEnteredPassword}
          onChange={this._handleInputChange('reEnteredPassword')}
          isSecure
        />

        <ProceedButton handlePress={this._handleUserCreation} />

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigText: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
});

export default CreateUser;
