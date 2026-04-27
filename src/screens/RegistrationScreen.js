// src/screens/RegistrationScreen.js
// Экран регистрации пользователя
// Форма с полями: имя, email, пароль
// Валидация на клиенте, сохранение в AsyncStorage
// После успешной регистрации → переход на HomeScreen

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme/themeContext';
import { textStyles } from '../theme/fonts';
import CustomButton from '../components/CustomButton';
import GlassCard from '../components/GlassCard';
import { saveUser } from '../utils/storage';

/**
 * RegistrationScreen - экран регистрации
 * @param {Object} navigation - Объект навигации от React Navigation
 */
const RegistrationScreen = ({ navigation }) => {
  const { colors } = useTheme();

  // Состояния для полей формы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Состояния для ошибок валидации
  const [errors, setErrors] = useState({});

  /**
   * Валидация формы
   * @returns {boolean} true если форма валидна
   */
  const validateForm = () => {
    const newErrors = {};

    // Проверка имени
    if (!name.trim()) {
      newErrors.name = 'Введите имя';
    } else if (name.length < 2) {
      newErrors.name = 'Имя должно быть не менее 2 символов';
    }

    // Проверка email
    if (!email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Некорректный email';
    }

    // Проверка пароля
    if (!password) {
      newErrors.password = 'Введите пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    // Проверка подтверждения пароля
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Обработчик отправки формы
   */
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Сохраняем данные пользователя (без пароля в реальном приложении!)
      await saveUser({
        name: name.trim(),
        email: email.trim(),
        // password не сохраняем в реальном приложении без хеширования
      });

      // Переход на главный экран после успешной регистрации
      navigation.replace('Home');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setErrors({ submit: 'Ошибка при регистрации. Попробуйте снова.' });
    }
  };

  // Стили для полей ввода в зависимости от темы
  const inputStyle = [
    styles.input,
    {
      backgroundColor: colors.surface,
      borderColor: errors.name ? colors.error : colors.border,
      color: colors.text,
    },
  ];

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GlassCard style={styles.card}>
          <Text style={[styles.title, { color: colors.text }]}>
            Создание аккаунта
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Заполните форму для начала работы
          </Text>

          {/* Поле имени */}
          <TextInput
            style={inputStyle}
            placeholder="Ваше имя"
            placeholderTextColor={colors.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          {errors.name && (
            <Text style={[styles.error, { color: colors.error }]}>
              {errors.name}
            </Text>
          )}

          {/* Поле email */}
          <TextInput
            style={inputStyle}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {errors.email && (
            <Text style={[styles.error, { color: colors.error }]}>
              {errors.email}
            </Text>
          )}

          {/* Поле пароля */}
          <TextInput
            style={inputStyle}
            placeholder="Пароль"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          {errors.password && (
            <Text style={[styles.error, { color: colors.error }]}>
              {errors.password}
            </Text>
          )}

          {/* Поле подтверждения пароля */}
          <TextInput
            style={inputStyle}
            placeholder="Подтвердите пароль"
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          {errors.confirmPassword && (
            <Text style={[styles.error, { color: colors.error }]}>
              {errors.confirmPassword}
            </Text>
          )}

          {/* Общая ошибка */}
          {errors.submit && (
            <Text style={[styles.error, { color: colors.error }]}>
              {errors.submit}
            </Text>
          )}

          {/* Кнопка регистрации */}
          <CustomButton
            title="Зарегистрироваться"
            onPress={handleRegister}
            style={styles.button}
          />
        </GlassCard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 24,
  },
  title: {
    ...textStyles.h1,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...textStyles.body,
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    ...textStyles.caption,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default RegistrationScreen;
