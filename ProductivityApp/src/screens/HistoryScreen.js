/**
 * Экран истории и статистики
 * Отображает историю выполненных активностей и аналитику
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

/**
 * Компонент экрана истории
 * @param {Object} navigation - объект навигации от React Navigation
 */
const HistoryScreen = ({ navigation }) => {
  // Состояние для хранения истории активностей
  const [historyData, setHistoryData] = useState([]);
  
  // Состояние для выбранного периода (день/неделя/месяц)
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Состояние для сводной статистики
  const [summary, setSummary] = useState({
    totalActivities: 0,
    completedActivities: 0,
    completionRate: 0,
    topCategory: '',
  });

  /**
   * Загрузка данных при монтировании компонента
   */
  useEffect(() => {
    loadHistoryData();
  }, [selectedPeriod]);

  /**
   * Функция загрузки данных истории
   * Генерирует демо-данные для разных периодов
   */
  const loadHistoryData = () => {
    // Демо-данные истории активностей
    const demoHistory = [
      {
        id: '1',
        date: '2024-01-15',
        title: 'Утренняя зарядка',
        category: 'Здоровье',
        completed: true,
        time: '08:00',
      },
      {
        id: '2',
        date: '2024-01-15',
        title: 'Чтение книги',
        category: 'Саморазвитие',
        completed: true,
        time: '10:30',
      },
      {
        id: '3',
        date: '2024-01-14',
        title: 'Работа над проектом',
        category: 'Работа',
        completed: true,
        time: '14:00',
      },
      {
        id: '4',
        date: '2024-01-14',
        title: 'Прогулка',
        category: 'Здоровье',
        completed: false,
        time: '18:00',
      },
      {
        id: '5',
        date: '2024-01-13',
        title: 'Изучение английского',
        category: 'Обучение',
        completed: true,
        time: '09:00',
      },
      {
        id: '6',
        date: '2024-01-13',
        title: 'Уборка квартиры',
        category: 'Дом',
        completed: true,
        time: '11:00',
      },
      {
        id: '7',
        date: '2024-01-12',
        title: 'Встреча с командой',
        category: 'Работа',
        completed: true,
        time: '15:00',
      },
      {
        id: '8',
        date: '2024-01-12',
        title: 'Йога',
        category: 'Здоровье',
        completed: false,
        time: '07:00',
      },
    ];

    setHistoryData(demoHistory);
    
    // Вычисляем статистику
    const total = demoHistory.length;
    const completed = demoHistory.filter(item => item.completed).length;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Находим самую популярную категорию
    const categoryCount = {};
    demoHistory.forEach(item => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });
    
    let topCat = '';
    let maxCount = 0;
    Object.entries(categoryCount).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCat = cat;
      }
    });
    
    setSummary({
      totalActivities: total,
      completedActivities: completed,
      completionRate: rate,
      topCategory: topCat,
    });
  };

  /**
   * Компонент отображения элемента списка истории
   */
  const renderHistoryItem = ({ item }) => (
    <View
      style={[
        styles.historyItem,
        !item.completed && styles.historyItemIncomplete,
      ]}
    >
      {/* Индикатор выполнения */}
      <View
        style={[
          styles.statusIndicator,
          item.completed && styles.statusIndicatorCompleted,
        ]}
      />
      
      {/* Информация об активности */}
      <View style={styles.historyInfo}>
        <Text
          style={[
            styles.historyTitle,
            !item.completed && styles.historyTitleIncomplete,
          ]}
        >
          {item.title}
        </Text>
        
        <View style={styles.historyMeta}>
          <Text style={styles.historyDate}>{item.date}</Text>
          <Text style={styles.historyDivider}>•</Text>
          <Text style={styles.historyCategory}>{item.category}</Text>
          <Text style={styles.historyDivider}>•</Text>
          <Text style={styles.historyTime}>{item.time}</Text>
        </View>
      </View>
      
      {/* Иконка статуса */}
      <View style={styles.statusIcon}>
        <Text style={styles.statusIconText}>
          {item.completed ? '✓' : '○'}
        </Text>
      </View>
    </View>
  );

  /**
   * Разделитель между датами в списке
   */
  const renderSectionHeader = (date) => (
    <View style={styles.dateHeader}>
      <Text style={styles.dateHeaderText}>{date}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>История активностей</Text>
        <Text style={styles.headerSubtitle}>
          Анализ ваших достижений и прогресса
        </Text>
      </View>

      {/* Карточки статистики */}
      <View style={styles.statsContainer}>
        {/* Общая статистика */}
        <View style={styles.statCard}>
          <Text style={styles.statCardLabel}>Всего активностей</Text>
          <Text style={styles.statCardValue}>{summary.totalActivities}</Text>
        </View>
        
        {/* Выполнено */}
        <View style={[styles.statCard, styles.statCardGreen]}>
          <Text style={styles.statCardLabel}>Выполнено</Text>
          <Text style={[styles.statCardValue, { color: '#4CAF50' }]}>
            {summary.completedActivities}
          </Text>
        </View>
        
        {/* Процент выполнения */}
        <View style={[styles.statCard, styles.statCardBlue]}>
          <Text style={styles.statCardLabel}>Эффективность</Text>
          <Text style={[styles.statCardValue, { color: '#3498DB' }]}>
            {summary.completionRate}%
          </Text>
        </View>
        
        {/* Топ категория */}
        <View style={[styles.statCard, styles.statCardPurple]}>
          <Text style={styles.statCardLabel}>Топ категория</Text>
          <Text style={[styles.statCardValue, { color: '#9B59B6' }]}>
            {summary.topCategory || '-'}
          </Text>
        </View>
      </View>

      {/* Переключатель периода */}
      <View style={styles.periodSelector}>
        <Text style={styles.periodLabel}>Период:</Text>
        <View style={styles.periodButtons}>
          {['day', 'week', 'month'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period === 'day'
                  ? 'День'
                  : period === 'week'
                  ? 'Неделя'
                  : 'Месяц'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Список истории */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Последние активности</Text>
        
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false} // Отключаем скролл внутри ScrollView
        />
      </View>
      
      {/* Отступ снизу */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// Стили компонента
const styles = StyleSheet.create({
  // Основной контейнер
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  
  // Заголовок
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  
  // Контейнер статистики
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  
  // Карточка статистики (эффект стекла)
  statCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
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
  statCardGreen: {
    backgroundColor: 'rgba(76, 175, 80, 0.08)',
    borderColor: 'rgba(76, 175, 80, 0.15)',
  },
  statCardBlue: {
    backgroundColor: 'rgba(52, 152, 219, 0.08)',
    borderColor: 'rgba(52, 152, 219, 0.15)',
  },
  statCardPurple: {
    backgroundColor: 'rgba(155, 89, 182, 0.08)',
    borderColor: 'rgba(155, 89, 182, 0.15)',
  },
  statCardLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E50',
  },
  
  // Переключатель периода
  periodSelector: {
    marginBottom: 20,
  },
  periodLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  periodButtonActive: {
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderColor: 'rgba(52, 152, 219, 0.5)',
  },
  periodButtonText: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // Секция истории
  historySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  
  // Элемент списка истории (эффект стекла)
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  historyItemIncomplete: {
    opacity: 0.7,
  },
  
  // Индикатор статуса
  statusIndicator: {
    width: 4,
    height: 40,
    backgroundColor: '#E74C3C',
    borderRadius: 2,
    marginRight: 12,
  },
  statusIndicatorCompleted: {
    backgroundColor: '#4CAF50',
  },
  
  // Информация об активности
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
  },
  historyTitleIncomplete: {
    color: '#95A5A6',
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyDate: {
    fontSize: 12,
    color: '#3498DB',
    fontWeight: '500',
  },
  historyDivider: {
    fontSize: 12,
    color: '#BDC3C7',
    marginHorizontal: 6,
  },
  historyCategory: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  historyTime: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  
  // Иконка статуса
  statusIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  statusIconText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
});

export default HistoryScreen;
