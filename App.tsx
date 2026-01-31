import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoItem from "./components/TodoItem";
import { Todo } from "./types/Todo";

const STORAGE_KEY = "todolist";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      setTodos(JSON.parse(data));
    }
  };

  const saveTodos = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos(oldTodos => [
      ...oldTodos,
      { id: Date.now().toString(), text, done: false },
    ]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo list</Text>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Enter task" value={text} onChangeText={setText}/>
        <Button title="Save" onPress={addTodo} />
      </View>

      <FlatList data={todos} keyExtractor={item => item.id} renderItem={({ item }) => (
          <TodoItem todo={item} onToggle={toggleTodo} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center"
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10
  },
  input: {
    flex: 1,
    padding: 10
  }
});
