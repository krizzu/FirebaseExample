import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class ControlledInput extends React.PureComponent {
  render() {
    const { value, title, onChange, isSecure } = this.props;
    return (
      <View style={styles.inputContainer}>
        <Text>{title}</Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          style={styles.input}
          secureTextEntry={isSecure}
          autoCapitalize="none"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: 200,
    padding: 10,
    backgroundColor: '#eee',
  },
});

export default ControlledInput;
