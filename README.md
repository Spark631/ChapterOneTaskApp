# Task Manager App

A modern, animated task management application built with React Native and Expo. The app features a beautiful UI with smooth animations and a clean, intuitive interface for managing your daily tasks.

## Features

- **Task Management**

  - Create, edit, and delete tasks
  - Add descriptions to tasks
  - Mark tasks as complete/incomplete
  - Smooth animations for all interactions
  - Task completion status with visual feedback

- **Task Organization**

  - Separate views for current and past tasks
  - Deleted tasks are automatically moved to the past tasks section
  - Clean, tab-based navigation between views

- **User Interface**
  - Modern, minimalist design
  - Smooth animations for task completion and deletion
  - Intuitive gesture-based interactions
  - Responsive layout that works on all screen sizes

## Setup Instructions

1. **Prerequisites**

   - Node.js (v18 or higher)
   - npm or yarn
   - Expo CLI (`npm install -g expo-cli`)

2. **Installation**

   ```bash
   # Clone the repository
   git clone [repository-url]

   # Navigate to the project directory
   cd task-manager

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Running the App**

   ```bash
   # Start the development server
   npm start
   # or
   yarn start
   ```

4. **Running on Devices**
   - Scan the QR code with the Expo Go app on your iOS/Android device
   - Press 'i' to open in iOS simulator
   - Press 'a' to open in Android emulator

## Usage Guide

1. **Adding Tasks**

   - Tap the "Add New Task" button at the bottom of the screen
   - Enter task title and optional description
   - Tap "Add Task" to save

2. **Managing Tasks**

   - Tap the checkbox to mark a task as complete
   - Tap the delete icon to remove a task
   - Completed tasks will fade to a lighter color
   - Deleted tasks will be moved to the "Past Tasks" tab

3. **Viewing Past Tasks**
   - Tap the "Past Tasks" tab at the top of the screen
   - View all previously deleted tasks
   - Past tasks are read-only

## Technical Details

### Third-Party Libraries

- **@expo/vector-icons**: Provides Material Icons for the UI
- **react-native-reanimated**: Powers smooth animations throughout the app
- **expo-router**: Handles navigation and routing
- **react-native-gesture-handler**: Enables gesture-based interactions
- **expo-blur**: Creates the blur effect in the tab bar (iOS)

### Project Structure

```
task-manager/
├── app/                 # Main application code
├── components/          # Reusable UI components
├── context/            # React Context for state management
├── types/              # TypeScript type definitions
└── assets/             # Images and other static assets
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
