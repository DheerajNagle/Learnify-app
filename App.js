import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
// NotificationService completely removed to fix boolean type error

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#6366f1" />
      <AppNavigator />
    </>
  );
}
