// src/screens/HomeScreen.js
// Главный экран приложения
// Приветствие, кнопка "Добавить активность", список активностей на сегодня
// Чекбоксы для отметки выполнения

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { useTheme } from '../theme/themeContext';
import { textStyles } from '../theme/fonts';
import GlassCard from '../components/GlassCard';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { getUser, getTodayActivities, addActivity, updateActivity } from '../utils/storage';

/**
 * HomeScreen - главный экран
 * @param {Object} navigation - Объект навигации
 */
const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  // Состояния
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newActivityTitle, setNewActivityTitle] = useState('');

  // Загрузка данных при монтировании
  useEffect(() => {
    loadData();
  }, []);

  // Функция загрузки данных пользователя и активностей
  const loadData = async () => {
    const userData = await getUser();
    setUser(userData);
    await loadActivities();
  };

  // Загрузка активностей за сегодня
  const loadActivities = async () => {
    const todayActivities = await getTodayActivities();
    setActivities(todayActivities);
  };

  // Обработчик добавления новой активности
  const handleAddActivity = async () => {
    if (!newActivityTitle.trim()) {
      return;
    }

    const newActivity = {
      id: Date.now().toString(), // Уникальный ID на основе времени
      title: newActivityTitle.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    await addActivity(newActivity);
    setNewActivityTitle('');
    setModalVisible(false);
    await loadActivities();
  };

  // Обработчик переключения статуса активности
  const handleToggleActivity = useCallback(async (id, completed) => {
    await updateActivity(id, { completed: !completed });
    await loadActivities();
  }, []);

  // Форматирование даты для приветствия
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Доброй ночи';
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  // Подсчёт выполненных активностей
  const completedCount = activities.filter((a) => a.completed).length;
  const totalCount = activities.length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Заголовок с навигацией */}
      <Header
        title="Главная"
        right={
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={[styles.avatarButton, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || '👤'}
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Приветствие */}
        <GlassCard style={styles.greetingCard}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            {getGreeting()}
          </Text>
          <Text style={[styles.userName, { color: colors.text }]}>
            {user?.name || 'Пользователь'}!
          </Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {new Date().toLocaleDateString('ru-RU', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </Text>
        </GlassCard>

        {/* Статистика за сегодня */}
        {totalCount > 0 && (
          <GlassCard style={styles.statsCard}>
            <Text style={[styles.statsTitle, { color: colors.text }]}>
              Прогресс сегодня
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(completedCount / totalCount) * 100}%`,
                    backgroundColor: colors.success,
                  },
                ]}
              />
            </View>
            <Text style={[styles.statsText, { color: colors.textSecondary }]}>
              {completedCount} из {totalCount} выполнено
            </Text>
          </GlassCard>
        )}

        {/* Список активностей на сегодня */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Активности на сегодня
          </Text>

          {activities.length === 0 ? (
            <GlassCard style={styles.emptyCard}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Нет активностей на сегодня{'\n'}
                Добавьте первую активность!
              </Text>
            </GlassCard>
          ) : (
            activities.map((activity) => (
              <GlassCard key={activity.id} style={styles.activityCard}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() =>
                    handleToggleActivity(activity.id, activity.completed)
                  }
                >
                  <View
                    style={[
                      styles.checkbox,
                      {
                        backgroundColor: activity.completed
                          ? colors.success
                          : 'transparent',
                        borderColor: activity.completed
                          ? colors.success
                          : colors.border,
                      },
                    ]}
                  >
                    {activity.completed && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <Text
                  style={[
                    styles.activityTitle,
                    {
                      color: activity.completed
                        ? colors.textSecondary
                        : colors.text,
                      textDecorationLine: activity.completed
                        ? 'line-through'
                        : 'none',
                    },
                  ]}
                >
                  {activity.title}
                </Text>
              </GlassCard>
            ))
          )}
        </View>

        {/* Кнопка добавления активности */}
        <CustomButton
          title="+ Добавить активность"
          onPress={() => setModalVisible(true)}
          style={styles.addButton}
        />
      </ScrollView>

      {/* Модальное окно для добавления активности */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.modalCard}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Новая активность
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Что нужно сделать?"
              placeholderTextColor={colors.textSecondary}
              value={newActivityTitle}
              onChangeText={setNewActivityTitle}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <CustomButton
                title="Отмена"
                onPress={() => setModalVisible(false)}
                variant="secondary"
                style={styles.modalButton}
              />
              <CustomButton
                title="Добавить"
                onPress={handleAddActivity}
                style={styles.modalButton}
              />
            </View>
          </GlassCard>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  greetingCard: {
    marginBottom: 16,
  },
  greeting: {
    ...textStyles.body,
  },
  userName: {
    ...textStyles.h1,
    marginTop: 4,
  },
  date: {
    ...textStyles.bodySmall,
    marginTop: 8,
  },
  statsCard: {
    marginBottom: 16,
  },
  statsTitle: {
    ...textStyles.h3,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsText: {
    ...textStyles.caption,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    ...textStyles.h3,
    marginBottom: 12,
  },
  emptyCard: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    ...textStyles.body,
    textAlign: 'center',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 16,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityTitle: {
    ...textStyles.body,
    flex: 1,
  },
  addButton: {
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
  },
  modalTitle: {
    ...textStyles.h2,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});

export default HomeScreen;
