import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTasks } from "../context/TaskContext";
import { Task } from "../types/task";

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const { addTask, updateTask } = useTasks();

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (task) {
      updateTask(task.id, { title, description });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
      });
    }

    onClose();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What do you want to do?"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={title}
        onChangeText={setTitle}
        autoFocus
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Task description"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={[styles.buttonText, styles.submitButtonText]}>
            {task ? "Update" : "Add"} Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#b51d1d",
    borderRadius: 8,
  },
  input: {
    // borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  submitButton: {
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonText: {
    color: "#b51d1d",
  },
  cancelButtonText: {
    color: "#FFFFFF",
  },
});
