import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { toggleTask, deleteTask } = useTasks();
  const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: task.completed ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [task.completed]);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#b51d1d", "#d44d4d"],
  });

  const handleDelete = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      deleteTask(task.id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          opacity: opacityAnim,
          transform: [
            {
              scale: opacityAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleTask(task.id)}
      >
        <MaterialIcons
          name={task.completed ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={task.completed ? "#4CAF50" : "#757575"}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <MaterialIcons name="delete" size={24} color="#FF5252" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#E0E0E0",
  },
  description: {
    fontSize: 14,
    color: "#E0E0E0",
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
});
