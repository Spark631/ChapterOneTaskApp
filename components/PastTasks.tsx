import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Task } from "../types/task";
import { TaskItem } from "./TaskItem";

interface PastTasksProps {
  tasks: Task[];
}

export const PastTasks: React.FC<PastTasksProps> = ({ tasks }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
});
