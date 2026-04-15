import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Switch, Alert, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [activeTab, setActiveTab] = useState('habits');
  const [habits, setHabits] = useState([
    { id: '1', title: 'Утренняя зарядка', completed: false, streak: 5 },
    { id: '2', title: 'Чтение 30 минут', completed: false, streak: 12 },
    { id: '3', title: 'Планирование дня', completed: true, streak: 8 },
  ]);
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Завершить проект', priority: 'high', completed: false },
    { id: '2', title: 'Ответить на emails', priority: 'medium', completed: true },
    { id: '3', title: 'Купить продукты', priority: 'low', completed: false },
  ]);
  const [newHabit, setNewHabit] = useState('');
  const [newTask, setNewTask] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState('work'); // work, shortBreak, longBreak

  // Pomodoro timer
  useEffect(() => {
    let interval = null;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(prev => prev - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      Alert.alert('Время вышло!', pomodoroMode === 'work' ? 'Сделайте перерыв!' : 'Возвращайтесь к работе!');
      if (pomodoroMode === 'work') {
        setPomodoroMode('shortBreak');
        setPomodoroTime(5 * 60);
      } else {
        setPomodoroMode('work');
        setPomodoroTime(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime, pomodoroMode]);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { id: Date.now().toString(), title: newHabit, completed: false, streak: 0 }]);
      setNewHabit('');
      setModalVisible(false);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: newTask, priority: 'medium', completed: false }]);
      setNewTask('');
      setModalVisible(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (pomodoroMode === 'work') setPomodoroTime(25 * 60);
    else if (pomodoroMode === 'shortBreak') setPomodoroTime(5 * 60);
    else setPomodoroTime(15 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#feca57';
      case 'low': return '#48dbfb';
      default: return '#95a5a6';
    }
  };

  const renderHabits = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🎯 Мои привычки</Text>
      <FlatList
        data={habits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.habitItem, item.completed && styles.completedItem]}>
            <TouchableOpacity onPress={() => toggleHabit(item.id)} style={styles.checkbox}>
              <View style={[styles.checkboxInner, item.completed && styles.checkboxChecked]} />
            </TouchableOpacity>
            <Text style={[styles.habitText, item.c