import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Animated,
  Dimensions,
  Easing,
  PanResponder,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskItem } from "../components/TaskItem";
import { TaskForm } from "../components/TaskForm";
import { PastTasks } from "../components/PastTasks";
import { useTasks } from "../context/TaskContext";
import { TaskProvider } from "../context/TaskContext";

const { height } = Dimensions.get("window");
const MAX_DRAG_DISTANCE = 400; // Increased to allow full dragging
const DRAG_THRESHOLD = MAX_DRAG_DISTANCE * 0.8; // Close when dragged 80% of the way

function HomeScreen() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const { tasks, pastTasks } = useTasks();
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.min(
          Math.max(gestureState.dy, 0),
          MAX_DRAG_DISTANCE
        );
        pan.setValue(newValue);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD) {
          handleClose();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
          }).start();
        }
      },
    })
  ).current;

  const handleAddPress = () => {
    setIsFormVisible(true);
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const handleClose = () => {
    Animated.timing(buttonAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      setIsFormVisible(false);
      pan.setValue(0);
    });
  };

  const formTranslateY = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.7, 0],
  });

  const dragTranslate = pan.interpolate({
    inputRange: [0, MAX_DRAG_DISTANCE],
    outputRange: [0, MAX_DRAG_DISTANCE],
    extrapolate: "clamp",
  });

  const combinedTranslateY = Animated.add(formTranslateY, dragTranslate);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "current" && styles.activeTab]}
          onPress={() => setActiveTab("current")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "current" && styles.activeTabText,
            ]}
          >
            Current Tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.activeTabText,
            ]}
          >
            Past Tasks
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "current" ? (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} />}
          contentContainerStyle={styles.list}
        />
      ) : (
        <PastTasks tasks={pastTasks} />
      )}

      {activeTab === "current" && (
        <View style={styles.addButton}>
          <TouchableOpacity
            style={styles.addButtonTouchable}
            onPress={handleAddPress}
          >
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add New Task</Text>
          </TouchableOpacity>
        </View>
      )}

      {isFormVisible && (
        <Animated.View
          style={[
            styles.formContainer,
            {
              transform: [{ translateY: combinedTranslateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragHandle} />
          <TaskForm onClose={handleClose} />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
  },
  date: {
    fontSize: 16,
    color: "#757575",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#b51d1d",
  },
  tabText: {
    fontSize: 16,
    color: "#757575",
  },
  activeTabText: {
    color: "#b51d1d",
    fontWeight: "600",
  },
  list: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: "#FFFFFF",
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#b51d1d",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  addButtonTouchable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 12,
  },
  formContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#b51d1d",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: height * 0.7,
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default function App() {
  return (
    <TaskProvider>
      <HomeScreen />
    </TaskProvider>
  );
}
