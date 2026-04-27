// src/screens/ProfileScreen.js
// Экран профиля пользователя
// Отображение имени, переключатель темы, кнопка "Выйти"

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme } from '../theme/themeContext';
import { textStyles } from '../theme/fonts';
import GlassCard from '../components/GlassCard';
import CustomButton from '../components/CustomButton';
import ThemeToggle from '../components/ThemeToggle';
import Header from '../components/Header';
import { getUser, logout, getActivities } from '../utils/storage';

/**
 * ProfileScreen - экран профиля
 * @param {Object} navigation - Объект навигации
 */
const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();

  // Состояния
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, completed: 0 });

  // Загрузка данных при монтировании
  useEffect(() => {
    loadData();
  }, []);

  // Загрузка данных пользователя и статистики
  const loadData = async () => {
    const userData = await getUser();
    setUser(userData);

    // Подсчёт статистики
    const allActivities = await getActivities();
    const total = allActivities.length;
    const completed = allActivities.filter((a) => a.completed).length;
    setStats({ total, completed });
  };

  // Обработчик выхода из системы
  const handleLogout = () => {
    Alert.alert(
      'Выход из системы',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              // Переход на экран регистрации с очисткой стека
              navigation.reset({
                index: 0,
                routes: [{ name: 'Registration' }],
              });
            } catch (error) {
              console.error('Ошибка при выходе:', error);
              Alert.alert('Ошибка', 'Не удалось выйти. Попробуйте снова.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Профиль" />

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Карточка профиля */}
        <GlassCard style={styles.profileCard}>
          <View style={[styles.avatarLarge, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarLargeText}>
              {user?.name?.charAt(0)?.toUpperCase() || '👤'}
            </Text>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.name || 'Пользователь'}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {user?.email || 'email@example.com'}
          </Text>
        </GlassCard>

        {/* Статистика */}
        <GlassCard style={styles.statsCard}>
          <Text style={[styles.statsTitle, { color: colors.text }]}>
            Общая статистика
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {stats.total}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Всего задач
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success }]}>
                {stats.completed}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Выполнено
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {stats.total > 0
                  ? Math.round((stats.completed / stats.total) * 100)
                  : 0}%
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Успех
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Настройки темы */}
        <GlassCard style={styles.settingsCard}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>
            Настройки
          </Text>
          <ThemeToggle />
        </GlassCard>

        {/* Кнопка выхода */}
        <CustomButton
          title="Выйти из аккаунта"
          onPress={handleLogout}
          variant="secondary"
          style={styles.logoutButton}
        />

        {/* Версия приложения */}
        <Text style={[styles.version, { color: colors.textSecondary }]}>
          ProductivityApp v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    padding: 32,
    marginBottom: 16,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarLargeText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
  },
  userName: {
    ...textStyles.h2,
    marginBottom: 8,
  },
  userEmail: {
    ...textStyles.body,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsTitle: {
    ...textStyles.h3,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...textStyles.h1,
    marginBottom: 4,
  },
  statLabel: {
    ...textStyles.caption,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  settingsCard: {
    marginBottom: 16,
  },
  settingsTitle: {
    ...textStyles.h3,
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 8,
  },
  version: {
    ...textStyles.caption,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default ProfileScreen;
