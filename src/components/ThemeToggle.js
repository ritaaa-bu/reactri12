// src/components/ThemeToggle.js
// Переключатель светлой/тёмной темы
// Использует иконку солнца/луны для визуализации
// Вызывает функцию toggleTheme из контекста

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/themeContext';

/**
 * ThemeToggle - кнопка переключения темы
 * @param {Object} props
 * @param {Object} props.style - Дополнительные стили
 */
const ThemeToggle = ({ style }) => {
  const { theme, toggleTheme, colors } = useTheme();

  // Иконка в зависимости от текущей темы
  const icon = theme === 'light' ? '🌙' : '☀️';
  const label = theme === 'light' ? 'Тёмная' : 'Светлая';

  return (
    <TouchableOpacity
      style={[
        styles.toggle,
        { 
          backgroundColor: colors.glass,
          borderColor: colors.border,
        },
        style,
      ]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Text style={[styles.icon, { color: colors.text }]}>{icon}</Text>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        {label} тема
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row', // Горизонтальное расположение
    alignItems: 'center', // Центрирование по вертикали
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8, // Расстояние между иконкой и текстом
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ThemeToggle;
