/**
 * Экран настроек приложения
 * Позволяет пользователю настроить параметры приложения
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';

/**
 * Компонент экрана настроек
 * @param {Object} navigation - объект навигации от React Navigation
 */
const SettingsScreen = ({ navigation }) => {
  // Состояния для переключателей настроек
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  
  // Состояние для выбранного языка
  const [selectedLanguage, setSelectedLanguage] = useState('ru');

  /**
   * Обработчик сброса всех данных
   * Показывает предупреждение перед удалением
   */
  const handleResetData = () => {
    Alert.alert(
      'Сброс данных',
      'Вы уверены, что хотите удалить все данные? Это действие нельзя отменить.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            // В реальном приложении здесь была бы очистка хранилища
            Alert.alert('Готово', 'Все данные успешно удалены');
          },
        },
      ]
    );
  };

  /**
   * Обработчик показа информации о приложении
   */
  const handleShowAbout = () => {
    Alert.alert(
      'О приложении',
      'ProductivityApp v1.0.0\n\nИнструмент повышения личной продуктивности на основе повседневных активностей.\n\n© 2024 Дипломный проект',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Заголовок */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Настройки</Text>
        <Text style={styles.headerSubtitle}>
          Настройте приложение под свои предпочтения
        </Text>
      </View>

      {/* Секция: Основные настройки */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Основные</Text>
        
        {/* Переключатель уведомлений */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Уведомления</Text>
            <Text style={styles.settingDescription}>
              Получать напоминания об активностях
            </Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#BDC3C7', true: '#81C784' }}
            thumbColor={notificationsEnabled ? '#4CAF50' : '#F5F7FA'}
          />
        </View>

        {/* Переключатель темной темы */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Тёмная тема</Text>
            <Text style={styles.settingDescription}>
              Использовать тёмное оформление
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#BDC3C7', true: '#81C784' }}
            thumbColor={darkMode ? '#4CAF50' : '#F5F7FA'}
          />
        </View>
      </View>

      {/* Секция: Звук и вибрация */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Звук и вибрация</Text>
        
        {/* Переключатель звука */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Звуковые сигналы</Text>
            <Text style={styles.settingDescription}>
              Воспроизводить звуки при событиях
            </Text>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#BDC3C7', true: '#81C784' }}
            thumbColor={soundEnabled ? '#4CAF50' : '#F5F7FA'}
          />
        </View>

        {/* Переключатель вибрации */}
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Вибрация</Text>
            <Text style={styles.settingDescription}>
              Вибрировать при уведомлениях
            </Text>
          </View>
          <Switch
            value={vibrationEnabled}
            onValueChange={setVibrationEnabled}
            trackColor={{ false: '#BDC3C7', true: '#81C784' }}
            thumbColor={vibrationEnabled ? '#4CAF50' : '#F5F7FA'}
          />
        </View>
      </View>

      {/* Секция: Язык */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Язык</Text>
        
        <View style={styles.languageContainer}>
          {['ru', 'en', 'es'].map((lang) => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.languageButton,
                selectedLanguage === lang && styles.languageButtonActive,
              ]}
              onPress={() => setSelectedLanguage(lang)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.languageButtonText,
                  selectedLanguage === lang && styles.languageButtonTextActive,
                ]}
              >
                {lang === 'ru' ? 'Русский' : lang === 'en' ? 'English' : 'Español'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Секция: Данные */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Данные</Text>
        
        {/* Кнопка экспорта данных */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Экспорт', 'Функция экспорта в разработке')}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>📤 Экспортировать данные</Text>
        </TouchableOpacity>
        
        {/* Кнопка импорта данных */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => Alert.alert('Импорт', 'Функция импорта в разработке')}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>📥 Импортировать данные</Text>
        </TouchableOpacity>
        
        {/* Кнопка сброса данных */}
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonDanger]}
          onPress={handleResetData}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionButtonText, styles.actionButtonTextDanger]}>
            🗑️ Сбросить все данные
          </Text>
        </TouchableOpacity>
      </View>

      {/* Секция: О приложении */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>О приложении</Text>
        
        <TouchableOpacity
          style={styles.aboutButton}
          onPress={handleShowAbout}
          activeOpacity={0.7}
        >
          <Text style={styles.aboutButtonText}>ℹ️ Информация о приложении</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => Alert.alert('Помощь', 'Функция помощи в разработке')}
          activeOpacity={0.7}
        >
          <Text style={styles.aboutButtonText}>❓ Помощь и поддержка</Text>
        </TouchableOpacity>
      </View>
      
      {/* Версия приложения */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Версия 1.0.0</Text>
        <Text style={styles.versionSubtext}>Дипломный проект 2024</Text>
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
  
  // Заголовок
  header: {
    marginBottom: 25,
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
  
  // Секция настроек (карточка с эффектом стекла)
  settingsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 195, 199, 0.3)',
  },
  
  // Элемент настройки
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(189, 195, 199, 0.2)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  
  // Контейнер выбора языка
  languageContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  
  // Кнопка выбора языка (эффект стекла)
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  languageButtonActive: {
    backgroundColor: 'rgba(52, 152, 219, 0.9)',
    borderColor: 'rgba(52, 152, 219, 0.5)',
  },
  languageButtonText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  languageButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  
  // Кнопка действия
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionButtonDanger: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderColor: 'rgba(231, 76, 60, 0.3)',
  },
  actionButtonText: {
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '500',
    textAlign: 'center',
  },
  actionButtonTextDanger: {
    color: '#E74C3C',
    fontWeight: '600',
  },
  
  // Кнопка "О приложении"
  aboutButton: {
    backgroundColor: 'rgba(52, 152, 219, 0.08)',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.2)',
  },
  aboutButtonText: {
    fontSize: 15,
    color: '#3498DB',
    fontWeight: '500',
    textAlign: 'center',
  },
  
  // Контейнер версии
  versionContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#95A5A6',
    fontWeight: '500',
  },
  versionSubtext: {
    fontSize: 12,
    color: '#BDC3C7',
    marginTop: 4,
  },
});

export default SettingsScreen;
