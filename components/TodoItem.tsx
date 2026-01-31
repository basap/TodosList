import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { Todo } from "../types/Todo";

interface TodoProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

const TodoItem: React.FC<TodoProps> = ({ todo, onToggle }) => {
  return (
    <Pressable onPress={() => onToggle(todo.id)}>
      <Text style={[styles.text, todo.done && styles.done]}>
        {todo.text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    paddingVertical: 8
  },
  done: {
    textDecorationLine: "line-through"
  }
});

export default TodoItem;
