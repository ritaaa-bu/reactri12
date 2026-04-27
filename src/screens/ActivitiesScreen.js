// src/screens/ActivitiesScreen.js
// Экран просмотра всех активностей
// Фильтрация по статусу (выполнено/в процессе)
// Возможность удаления активностей

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../theme/themeContext';
import { textStyles } from '../theme/fonts';
import GlassCard from '../components/GlassCard';
import Header from '../components/Header';
import { getActivities, deleteActivity, updateActivity } from '../utils/storage';

/**
 * ActivitiesScreen - экран всех активностей
 * @param {Object} navigation - Объект навигации
 */
const ActivitiesScreen = ({ navigation }) => {
  const { colors } = useTheme();

  // Состояния
  const [allActivities, setAllActivities] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Загрузка активностей при монтировании
  useEffect(() => {
    loadActivities();
  }, []);

  // Загрузка всех активностей из хранилища
  const loadActivities = async () => {
    const activities = await getActivities();
    // Сортировка: сначала новые
    activities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setAllActivities(activities);
  };

  // Обработчик переключения статуса активности
  const handleToggleActivity = useCallback(async (id, completed) => {
    await updateActivity(id, { completed: !completed });
    await loadActivities();
  }, []);

  // Обработчик удаления активности
  const handleDeleteActivity = (id, title) => {
    Alert.alert(
      'Удалить активность',
      `Вы уверены, что хотите удалить "${title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            await deleteActivity(id);
            await loadActivities();
          },
        },
      ]
    );
  };

  // Фильтрация активностей
  const filteredActivities = allActivities.filter((activity) => {
    if (filter === 'active') return !activity.completed;
    if (filter === 'completed') return activity.completed;
    return true;
  });

  // Подсчёт статистики
  const activeCount = allActivities.filter((a) => !a.completed).length;
  const completedCount = allActivities.filter((a) => a.completed).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Все активности" />

      {/* Фильтры */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: filter === 'all' ? colors.primary : colors.surface },
            { borderColor: colors.border },
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              { color: filter === 'all' ? '#FFFFFF' : colors.text },
            ]}
          >
            Все ({allActivities.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: filter === 'active' ? colors.primary : colors.surface },
            { borderColor: colors.border },
          ]}
          onPress={() => setFilter('active')}
        >
          <Text
            style={[
              styles.filterText,
              { color: filter === 'active' ? '#FFFFFF' : colors.text },
            ]}
          >
            В процессе ({activeCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            { backgroundColor: filter === 'completed' ? colors.primary : colors.surface },
            { borderColor: colors.border },
          ]}
          onPress={() => setFilter('completed')}
        >
          <Text
            style={[
              styles.filterText,
              { color: filter === 'completed' ? '#FFFFFF' : colors.text },
            ]}
          >
            Выполнено ({completedCount})
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Список активностей */}
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {filteredActivities.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              {filter === 'all'
                ? 'Нет активностей\nДобавьте первую активность!'
                : filter === 'active'
                ? 'Нет активных задач\nВсе выполнено!'
                : 'Нет выполненных задач'}
            </Text>
          </GlassCard>
        ) : (
          filteredActivities.map((activity) => (
            <GlassCard key={activity.id} style={styles.activityCard}>
              <View style={styles.activityHeader}>
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
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    handleDeleteActivity(activity.id, activity.title)
                  }
                >
                  <Text style={[styles.deleteText, { color: colors.error }]}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.activityDate, { color: colors.textSecondary }]}>
                {new Date(activity.createdAt).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </GlassCard>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  filterText: {
    ...textStyles.bodySmall,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  emptyCard: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    ...textStyles.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  activityCard: {
    marginBottom: 12,
    padding: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
    fontWeight: '600',
  },
  activityDate: {
    ...textStyles.caption,
    marginTop: 4,
  },
});

export default ActivitiesScreen;
