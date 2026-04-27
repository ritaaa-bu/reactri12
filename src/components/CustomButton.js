// src/components/CustomButton.js
// Кастомная кнопка с современным дизайном
// Поддерживает разные размеры и состояния
// Использует акцентный цвет из темы

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/themeContext';
import { textStyles } from '../theme/fonts';

/**
 * CustomButton - стильная кнопка для приложения
 * @param {Object} props
 * @param {string} props.title - Текст кнопки
 * @param {Function} props.onPress - Обработчик нажатия
 * @param {boolean} props.disabled - Состояние disabled
 * @param {string} props.variant - Вариант: 'primary' (основная) или 'secondary' (вторичная)
 * @param {Object} props.style - Дополнительные стили
 */
const CustomButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  variant = 'primary',
  style 
}) => {
  const { colors } = useTheme();

  // Выбираем стили в зависимости от варианта кнопки
  const buttonStyles = [
    styles.button,
    variant === 'primary' 
      ? { backgroundColor: colors.primary } 
      : { backgroundColor: 'transparent', borderWidth: 2, borderColor: colors.primary },
    disabled && { opacity: 0.5 }, // Полупрозрачность если disabled
    style,
  ];

  const textStylesButton = [
    styles.buttonText,
    { color: variant === 'primary' ? '#FFFFFF' : colors.primary },
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8} // Прозрачность при нажатии
    >
      <Text style={textStylesButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14, // Вертикальные отступы
    paddingHorizontal: 24, // Горизонтальные отступы
    borderRadius: 12, // Скругление углов
    alignItems: 'center', // Центрирование текста
    justifyContent: 'center',
  },
  buttonText: {
    ...textStyles.body,
    fontWeight: '600', // Полужирный текст
    letterSpacing: 0.5, // Межбуквенный интервал
  },
});

export default CustomButton;
