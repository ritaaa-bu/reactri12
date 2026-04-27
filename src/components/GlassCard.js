// src/components/GlassCard.js
// Компонент карточки с эффектом "стекла"
// Реализован БЕЗ тяжёлых blur-библиотек:
// - Полупрозрачный фон (rgba)
// - Тонкая светлая граница
// - Мягкая тень
// - Скругления 14px

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme/themeContext';

/**
 * GlassCard - карточка с эффектом матового стекла
 * @param {Object} props
 * @param {React.ReactNode} props.children - Дочерние элементы для отображения внутри карточки
 * @param {Object} props.style - Дополнительные стили (передаются снаружи)
 * @param {number} props.padding - Внутренний отступ (по умолчанию 16)
 */
const GlassCard = ({ children, style, padding = 16 }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.glass, // Полупрозрачный фон
          borderColor: colors.glassBorder, // Тонкая граница
          shadowColor: colors.shadow, // Цвет тени
          padding: padding,
        },
        style, // Пользовательские стили поверх базовых
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14, // Скругление углов
    borderWidth: 1, // Тонкая граница для эффекта стекла
    // Тень для iOS
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    // Тень для Android
    elevation: 4,
  },
});

export default GlassCard;
