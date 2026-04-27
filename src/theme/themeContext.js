// src/theme/themeContext.js
// Контекст для управления темой (светлая/тёмная)
// Используем React Context API для глобального доступа к теме
// Данные о выбранной теме сохраняются в AsyncStorage

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors } from './colors';
import { darkColors } from './colors';
import { textStyles } from './fonts';

// Создаём контекст с начальными значениями
const ThemeContext = createContext({
  theme: 'light', // Текущая тема: 'light' или 'dark'
  colors: lightColors, // Цвета текущей темы
  textStyles: textStyles, // Текстовые стили (общие для обеих тем)
  toggleTheme: () => {}, // Функция переключения темы
});

// Ключ для хранения в AsyncStorage
const THEME_KEY = '@productivity_app_theme';

// Провайдер темы - оборачивает приложение и предоставляет доступ к теме
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isLoaded, setIsLoaded] = useState(false);

  // Загрузка сохранённой темы при запуске приложения
  useEffect(() => {
    loadTheme();
  }, []);

  // Функция загрузки темы из AsyncStorage
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Ошибка загрузки темы:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  // Функция переключения темы
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    try {
      // Сохраняем новую тему в AsyncStorage
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Ошибка сохранения темы:', error);
    }
  };

  // Выбираем цвета в зависимости от текущей темы
  const colors = theme === 'light' ? lightColors : darkColors;

  // Не рендерим приложение, пока тема не загружена
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, textStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для удобного использования контекста в компонентах
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  return context;
};
