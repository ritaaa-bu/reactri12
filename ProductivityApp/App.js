/**
 * Главный файл приложения - точка входа
 * Настраивает навигацию между экранами
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Импорт экранов
import HomeScreen from './src/screens/HomeScreen';
import AddActivityScreen from './src/screens/AddActivityScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Создаем стек навигации
// Стек позволяет переходить между экранами с анимацией и историей переходов
const Stack = createNativeStackNavigator();

/**
 * Основной компонент приложения
 * Отвечает за настройку навигации
 */
const App = () => {
  return (
    // NavigationContainer - обертка, управляющая деревом навигации
    <NavigationContainer>
      {/* 
        Stack.Navigator - конфигурирует стек экранов
        screenOptions задает общие опции для всех экранов в стеке
      */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // Полупрозрачный хедер с эффектом стекла
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5, // Для Android
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: '600',
          },
          // Белый фон для всех экранов
          contentStyle: { backgroundColor: '#F5F7FA' },
        }}
      >
        {/* Экран главной страницы / дашборда */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '📊 Продуктивность' }}
        />
        
        {/* Экран добавления новой активности */}
        <Stack.Screen
          name="AddActivity"
          component={AddActivityScreen}
          options={{ title: '➕ Добавить активность' }}
        />
        
        {/* Экран истории и статистики */}
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: '📈 История' }}
        />
        
        {/* Экран настроек */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: '⚙️ Настройки' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
