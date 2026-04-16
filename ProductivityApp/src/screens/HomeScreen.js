/**
 * Экран главной страницы (Дашборд)
 * Отображает сводку активностей, прогресс и быстрый доступ к функциям
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// Получаем размеры экрана для адаптивности
const { width, height } = Dimensions.get('window');

/**
 * Компонент главного экрана
 * @param {Object} navigation - объект навигации от React Navigation
 */
const HomeScreen = ({ navigation }) => {
  // Состояние для хранения списка активностей
  const [activities, setActivities] = useState([]);
  
  // Состояние для хранения статистики
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  /**
   * Загрузка данных при монтировании компонента
   * В реальном приложении здесь был бы запрос к API или локальному хранилищу
   */
  useEffect(() => {
    // Имитация загрузки данных из хранилища
    loadActivities();
  }, []);

  /**
   * Функция загрузки активностей
   * В демо-режиме создаем тестовые данные
   */
  const loadActivities = () => {
    // Демо-данные для отображения
    const demoActivities = [
      {
        id: '1',
        title: 'Утренняя зарядка',
        category: 'Здоровье',
        completed: true,
        time: '08:00',
      },
      {
        id: '2',
        title: 'Чтение книги',
        category: 'Саморазвитие',
        completed: true,
        time: '10:30',
      },
      {
        id: '3',
        title: 'Работа над проектом',
        category: 'Работа',
        completed: false,
        time: '14:00',
      },
      {
        id: '4',
        title: 'Прогулка',
        category: 'Здоровье',
        completed: false,
        time: '18:00',
      },
    ];

    setActivities(demoActivities);
    
    // Вычисляем статистику
    const total = demoActivities.length;
    const completed = demoActivities.filter(a => a.completed).length;
    const pending = total - completed;
    
    setStats({ total, completed, pending });
  };

  /**
   * Обработчик отметки активности как выполненной
   * @param {string} id - идентификатор активности
   */
  const toggleActivity = (id) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
    
    // Пересчитываем статистику
    const updatedActivities = activities.map(a =>
      a.id === id ? { ...a, completed: !a.completed } : a
    );
    const total = updatedActivities.length;
    const completed = updatedActivities.filter(a => a.completed).length;
    const pending = total - completed;
    setStats({ total, completed, pending });
  };

  /**
   * Вычисление процента выполнения
   */
  const getProgressPercent = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Приветственный блок */}
      <View style={styles.headerSection}>
        <Text style={styles.greetingText}>Добрый день! 👋</Text>
        <Text style={styles.subtitleText}>Ваш прогресс сегодня</Text>
      </View>

      {/* Карточка прогресса с эффектом стекла */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Общий прогресс</Text>
          <Text style={styles.progressPercent}>{getProgressPercent()}%</Text>
        </View>
        
        {/* Полоса прогресса */}
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${getProgressPercent()}%` },
            ]}
          />
        </View>
        
        {/* Статистика в цифрах */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Всего</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#4CAF50' }]}>
              {stats.completed}
            </Text>
            <Text style={styles.statLabel}>Выполнено</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: '#FF9800' }]}>
              {stats.pending}
            </Text>
            <Text style={styles.statLabel}>Осталось</Text>
          </View>
        </View>
      </View>

      {/* Список активностей */}
      <View style={styles.activitiesSection}>
        <Text style={styles.sectionTitle}>Сегодняшние активности</Text>
        
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[
              styles.activityCard,
              activity.completed && styles.activityCardCompleted,
            ]}
            onPress={() => toggleActivity(activity.id)}
            activeOpacity={0.7}
          >
            {/* Индикатор выполнения */}
            <View
              style={[
                styles.checkbox,
                activity.completed && styles.checkboxChecked,
              ]}
            >
              {activity.completed && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            
            {/* Информация об активности */}
            <View style={styles.activityInfo}>
              <Text
                style={[
                  styles.activityTitle,
                  activity.completed && styles.activityTitleCompleted,
                ]}
              >
                {activity.title}
              </Text>
              <View style={styles.activityMeta}>
                <Text style={styles.activityCategory}>
                  {activity.category}
                </Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Плавающие кнопки действий */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => navigation.navigate('AddActivity')}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>➕</Text>
          <Text style={styles.fabText}>Новая</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => navigation.navigate('History')}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>📈</Text>
          <Text style={styles.fabText}>История</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>⚙️</Text>
          <Text style={styles.fabText}>Настройки</Text>
        </TouchableOpacity>
      </View>
      
      {/* Отступ снизу для прокрутки */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  // Основной контейнер
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  
  // Секция приветствия
  headerSection: {
    padding: 20,
    paddingTop: 30,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  
  // Карточка прогресса (эффект стекла)
  progressCard: {
    margin: 20,
    marginTop: 10,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  progressPercent: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3498DB',
  },
  
  // Полоса прогресса
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(52, 152, 219, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498DB',
    borderRadius: 6,
  },
  
  // Строка статистики
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
  },
  
  // Секция активностей
  activitiesSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
    marginTop: 10,
  },
  
  // Карточка активности (эффект стекла)
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  activityCardCompleted: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: 'rgba(76, 175, 80, 0.2)',
  },
  
  // Чекбокс
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#BDC3C7',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  
  // Информация об активности
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  activityTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#95A5A6',
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityCategory: {
    fontSize: 13,
    color: '#3498DB',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 13,
    color: '#7F8C8D',
  },
  
  // Контейнер плавающих кнопок
  fabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  
  // Плавающая кнопка (эффект стекла)
  fabButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    minWidth: 80,
  },
  fabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  fabText: {
    fontSize: 12,
    color: '#2C3E50',
    fontWeight: '600',
  },
});

export default HomeScreen;
