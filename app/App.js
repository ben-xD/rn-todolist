import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import Heading from './Heading';
import Input from './Input';
import Button from './Button';
import Todo from './Todo';
import TabBar from './TabBar';
import TodoList from '../TodoList';

let todoIndex = 0;

const initialTodoItems = [
  {
    title: 'Wash bananas',
    todoIndex: todoIndex++,
    complete: false
  },
  {
    title: 'Eat banana',
    todoIndex: todoIndex++,
    complete: true
  },
  {
    title: 'Smell bananas',
    todoIndex: todoIndex++,
    complete: true
  }
];

export default App = () => {
  const [todoItems, setTodoItems] = useState(initialTodoItems);
  const [inputValue, setInputValue] = useState('');
  const [type, setType] = useState('All');

  const submitTodo = () => {
    if (inputValue.match(/^\s*$/)) {
      return;
    }
    const todo = {
      title: inputValue,
      complete: false,
      todoIndex: todoIndex++
    };

    setTodoItems([...todoItems, todo]);
    setInputValue('');
  };

  const toggleComplete = todoIndex => {
    let todoItemsLocal = todoItems;
    todoItemsLocal.map(todo => {
        if (todo.todoIndex == todoIndex) {
          todo.complete = !todo.complete;
        }
    })
    // TODO why?
    // setTodoItems(todoItemsLocal);
    setTodoItems([...todoItemsLocal]);
  };

  const deleteTodo = index => {
      const todos = todoItems.filter(todo => {
          return todo.todoIndex !== index;
      });
      setTodoItems([...todos])
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Heading title='Eath' value={inputValue}></Heading>
        <TodoList type={type} items={todoItems} toggleComplete={toggleComplete} deleteTodo={deleteTodo}></TodoList>
        <Input setInputValue={setInputValue} inputValue={inputValue}></Input>
        <Button submitTodo={submitTodo}></Button>
      </ScrollView>
      <TabBar type={type} setType={setType} deleteTodo={deleteTodo} toggleComplete={toggleComplete}></TabBar>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#32d7fc',
    flex: 1
  },
  content: {
    flex: 1,
    paddingTop: 40
  },
  todo: {
    color: 'white',
    paddingBottom: 20,
    fontWeight: '300',
    fontSize: 20,
    textAlign: 'center'
  }
});
