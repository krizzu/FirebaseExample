import React, { Component } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';

import { logoutUser } from '../firebase/auth';
import { getList, addItemToList, removeListener } from '../firebase/db';

import BackButton from '../components/BackButton';
import TodoList from '../components/ToDoList';

class Home extends Component {
  state = {
    error: '',
    userTodos: [],
    newTodo: '',
  };

  componentDidMount() {
    getList((error, list) => {
      if (error) {
        this.setState(() => ({
          error: error.toString(),
        }));
      }
      this.setState(() => ({
        userTodos: list,
      }));
    });
  }

  _handleTextChange = newTodo => {
    this.setState(() => ({
      newTodo,
    }));
  };

  _handleLogOut = async () => {
    try {
      await removeListener();
      await logoutUser();
    } catch (e) {
      this.setState(() => ({
        error: e,
      }));
      return;
    }

    this.props.changeRoute('/');
  };

  _handleTodoAdd = () => {
    const { newTodo } = this.state;
    addItemToList(newTodo);
    this.setState(() => ({
      newTodo: '',
    }));
  };

  render() {
    const { error, userTodos, newTodo } = this.state;
    return (
      <View style={styles.container}>
        <BackButton goBack={this._handleLogOut} title="Logout" />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.list}>
          <TodoList todos={userTodos} />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            value={newTodo}
            onChangeText={this._handleTextChange}
          />
          <Button
            style={styles.inputButton}
            title="Add"
            onPress={this._handleTodoAdd}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  list: {
    flex: 1,
  },
  input: {
    padding: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    flex: 1,
  },
  inputButton: {
    width: 70,
    padding: 5,
  },
  error: {
    color: 'red',
  },
});

export default Home;
