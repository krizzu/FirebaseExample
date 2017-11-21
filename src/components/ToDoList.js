import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { removeTodo } from '../firebase/db';

class TodoList extends React.Component {
  _renderItem = ({ item }) => {
    const { todoDetails, id } = item;
    return (
      <TouchableOpacity onPress={this._handleItemPress(id)}>
        <Text
          style={[
            styles.todoItem,
            todoDetails.finished ? styles.finishedItem : null,
          ]}
        >
          {todoDetails.todo}
        </Text>
      </TouchableOpacity>
    );
  };
  _keyExtractor = ({ todoDetails }) => todoDetails.timestamp;
  _handleItemPress = item => () => removeTodo(item);

  render() {
    const { todos } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.largeText}>Your todos:</Text>
        </View>
        <FlatList
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          data={todos}
          ItemSeparatorComponent={() => (
            <View style={{ height: 2, backgroundColor: '#333' }} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
  },
  largeText: {
    fontSize: 23,
    marginBottom: 10,
  },
  todoItem: {
    padding: 10,
    fontSize: 17,
  },
  finishedItem: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
    color: 'red',
  },
});

export default TodoList;
