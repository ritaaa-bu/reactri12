/**
 * Экран добавления новой активности
 * Форма для создания записи о повседневной активности
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

/**
 * Компонент экрана добавления активности
 * @param {Object} navigation - объект навигации от React Navigation
 */
const AddActivityScreen = ({ navigation }) => {
  // Состояния для полей формы
  const [title, setTitle] = useState(''); // Название активности
  const [category, setCategory] = useState(''); // Категория активности
  const [time, setTime] = useState(''); // Время выполнения
  const [notes, setNotes] = useState(''); // Дополнительные заметки
  
  // Список предустановленных категорий
  const categories = [
    'Работа',
    'Здоровье',
    'Саморазвитие',
    'Дом',
    'Хобби',
    'Обучение',
    'Другое',
  ];

  /**
   * Обработчик сохранения новой активности
   * Проверяет заполненность полей и создает новую запись
   */
  const handleSave = () => {
    // Валидация: проверяем обязательные поля
    if (!title.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите название активности');
      return;
    }
    
    if (!category) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите категорию');
      return;
    }
    
    if (!time.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, укажите время');
      return;
    }
    
    // Формируем объект новой активности
    const newActivity = {
      id: Date.now().toString(), // Уникальный ID на основе времени
      title: title.trim(),
      category: category,
      time: time.trim(),
      notes: notes.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    // В реальном приложении здесь была бы отправка данных в хранилище
    // Для демонстрации показываем успешное сообщение
    Alert.alert(
      'Успешно!',
      `Активность "${newActivity.title}" добавлена`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Очищаем форму
            resetForm();
            // Возвращаемся на главный экран
            navigation.goBack();
          },
        },
      ]
    );
  };

  /**
   * Функция сброса формы к начальным значениям
   */
  const resetForm = () => {
    setTitle('');
    setCategory('');
    setTime('');
    setNotes('');
  };

  /**
   * Обработчик выбора категории
   * @param {string} selectedCategory - выбранная категория
   */
  const selectCategory = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Заголовок формы */}
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>Новая активность</Text>
        <Text style={styles.formSubtitle}>
          Заполните информацию о вашей повседневной активности
        </Text>
      </View>

      {/* Поле ввода названия */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Название *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Например: Утренняя зарядка"
          placeholderTextColor="#95A5A6"
          value={title}
          onChangeText={setTitle}
          maxLength={50}
        />
      </View>

      {/* Выбор категории */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Категория *</Text>
        <Text style={styles.hintText}>Выберите одну из предложенных</Text>
        
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                category === cat && styles.categoryChipSelected,
              ]}
              onPress={() => selectCategory(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  category === cat && styles.categoryChipTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Поле ввода времени */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Время выполнения *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Например: 08:00 или 14:30"
          placeholderTextColor="#95A5A6"
          value={time}
          onChangeText={setTime}
          keyboardType="number-pad"
          maxLength={5}
        />
        <Text style={styles.inputHint}>Формат: ЧЧ:ММ</Text>
      </View>

      {/* Поле для заметок (необязательное) */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Заметки (необязательно)</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          placeholder="Дополнительная информация..."
          placeholderTextColor="#95A5A6"
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={200}
        />
      </View>

      {/* Кнопки действий */}
      <View style={styles.buttonContainer}>
        {/* Кнопка отмены */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Отмена</Text>
        </TouchableOpacity>
        
        {/* Кнопка сохранения */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
      
      {/* Отступ снизу */}
      <View style={{ height: 50 }} />
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
  
  // Заголовок формы
  formHeader: {
    marginBottom: 30,
    marginTop: 10,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  
  // Группа полей ввода
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 13,
    color: '#95A5A6',
    marginBottom: 10,
  },
  
  // Текстовое поле ввода (эффект стекла)
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Многострочное поле
  textArea: {
    minHeight: 100,
    paddingTop: 15,
  },
  
  // Подсказка под полем ввода
  inputHint: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 6,
  },
  
  // Сетка категорий
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  
  // Чип категории (эффект стекла)
  categoryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  
  // Выбранная категория
  categoryChipSelected: {
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderColor: 'rgba(52, 152, 219, 0.5)',
  },
  
  // Текст чипа категории
  categoryChipText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // Контейнер кнопок
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  
  // Кнопка отмены (прозрачная)
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: 'rgba(236, 240, 241, 0.8)',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(189, 195, 199, 0.3)',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  
  // Кнопка сохранения (акцентная)
  saveButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#3498DB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default AddActivityScreen;
