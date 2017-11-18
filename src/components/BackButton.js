import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

class backButton extends React.PureComponent {
  render() {
    return (
      <View style={styles.backButton}>
        <Button
          title={this.props.title || 'back'}
          onPress={this.props.goBack}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
});

export default backButton;
