// src/components/Header.js
// Заголовок экрана с названием и опциональной кнопкой
// Использует стили из темы для согласованности

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/themeContext';
import { textStyles } from '../theme/fonts';

/**
 * Header - заголовок экрана
 * @param {Object} props
 * @param {string} props.title - Заголовок
 * @param {React.ReactNode} props.right - Элемент справа (опционально)
 */
const Header = ({ title, right }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {right && <View style={styles.right}>{right}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', // Горизонтальное расположение
    justifyContent: 'space-between', // Распределение пространства
    alignItems: 'center', // Центрирование по вертикали
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    ...textStyles.h2, // Стиль заголовка H2
  },
  right: {
    // Контейнер для правого элемента
  },
});

export default Header;
