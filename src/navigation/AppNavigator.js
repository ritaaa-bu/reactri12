// src/navigation/AppNavigator.js
// Навигация приложения с использованием React Navigation v6
// Стек навигации: Registration → Home → Activities/Profile

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme/themeContext';

// Импорт экранов
import RegistrationScreen from '../screens/RegistrationScreen';
import HomeScreen from '../screens/HomeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Создаём стек навигации
const Stack = createStackNavigator();

/**
 * AppNavigator - главный навигатор приложения
 * Определяет структуру переходов между экранами
 */
const AppNavigator = () => {
  const { colors } = useTheme();

  // Общие опции для всех экранов стека
  const screenOptions = {
    headerShown: false, // Скрываем стандартный заголовок (используем свой Header)
    cardStyle: {
      backgroundColor: colors.background, // Цвет фона для всех экранов
    },
    // Анимация перехода
    cardStyleInterpolator: ({ current, layouts }) => ({
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    }),
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Registration" // Начальный экран
        screenOptions={screenOptions}
      >
        {/* Экран регистрации - начальный экран */}
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: 'Регистрация' }}
        />

        {/* Главный экран со списком активностей на сегодня */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Главная' }}
        />

        {/* Экран всех активностей с фильтрацией */}
        <Stack.Screen
          name="Activities"
          component={ActivitiesScreen}
          options={{ title: 'Активности' }}
        />

        {/* Экран профиля пользователя */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Профиль' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
