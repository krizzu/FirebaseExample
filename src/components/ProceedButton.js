import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

class backButton extends React.PureComponent {
  render() {
    return (
      <View style={styles.buttonStyle}>
        <Button
          style={styles.butonText}
          title="Proceed"
          onPress={this.props.handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#dfca',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#eee',
    borderStyle: 'solid',
  },
  butonText: {
    color: '#fff',
  },
});

export default backButton;
