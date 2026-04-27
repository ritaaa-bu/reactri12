// src/utils/storage.js
// Утилиты для работы с AsyncStorage
// Централизованное хранилище для всех данных приложения
// Используем простые ключи и JSON-сериализацию

import AsyncStorage from '@react-native-async-storage/async-storage';

// Ключи для хранения данных
const KEYS = {
  USER: '@productivity_app_user', // Данные пользователя (имя, email)
  ACTIVITIES: '@productivity_app_activities', // Список активностей
};

/**
 * Сохранение данных пользователя
 * @param {Object} userData - Объект с полями name, email, password
 */
export const saveUser = async (userData) => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(userData));
  } catch (error) {
    console.error('Ошибка сохранения пользователя:', error);
    throw error;
  }
};

/**
 * Получение данных пользователя
 * @returns {Object|null} Данные пользователя или null если не найден
 */
export const getUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Ошибка получения пользователя:', error);
    return null;
  }
};

/**
 * Проверка, зарегистрирован ли пользователь
 * @returns {boolean} true если пользователь зарегистрирован
 */
export const isUserRegistered = async () => {
  const user = await getUser();
  return user !== null;
};

/**
 * Выход из системы (очистка данных пользователя)
 */
export const logout = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.USER);
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    throw error;
  }
};

/**
 * Сохранение списка активностей
 * @param {Array} activities - Массив объектов активностей
 */
export const saveActivities = async (activities) => {
  try {
    await AsyncStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(activities));
  } catch (error) {
    console.error('Ошибка сохранения активностей:', error);
    throw error;
  }
};

/**
 * Получение списка активностей
 * @returns {Array} Массив активностей или пустой массив
 */
export const getActivities = async () => {
  try {
    const activities = await AsyncStorage.getItem(KEYS.ACTIVITIES);
    return activities ? JSON.parse(activities) : [];
  } catch (error) {
    console.error('Ошибка получения активностей:', error);
    return [];
  }
};

/**
 * Добавление новой активности
 * @param {Object} activity - Объект активности с полями id, title, completed, createdAt
 */
export const addActivity = async (activity) => {
  try {
    const activities = await getActivities();
    activities.push(activity);
    await saveActivities(activities);
  } catch (error) {
    console.error('Ошибка добавления активности:', error);
    throw error;
  }
};

/**
 * Обновление активности (например, отметка о выполнении)
 * @param {string} activityId - ID активности
 * @param {Object} updates - Объект с полями для обновления
 */
export const updateActivity = async (activityId, updates) => {
  try {
    const activities = await getActivities();
    const index = activities.findIndex((a) => a.id === activityId);
    if (index !== -1) {
      activities[index] = { ...activities[index], ...updates };
      await saveActivities(activities);
    }
  } catch (error) {
    console.error('Ошибка обновления активности:', error);
    throw error;
  }
};

/**
 * Удаление активности
 * @param {string} activityId - ID активности для удаления
 */
export const deleteActivity = async (activityId) => {
  try {
    const activities = await getActivities();
    const filtered = activities.filter((a) => a.id !== activityId);
    await saveActivities(filtered);
  } catch (error) {
    console.error('Ошибка удаления активности:', error);
    throw error;
  }
};

/**
 * Получение активностей за сегодня
 * @returns {Array} Массив активностей, созданных сегодня
 */
export const getTodayActivities = async () => {
  try {
    const activities = await getActivities();
    const today = new Date().toDateString();
    return activities.filter((activity) => {
      const activityDate = new Date(activity.createdAt).toDateString();
      return activityDate === today;
    });
  } catch (error) {
    console.error('Ошибка получения активностей за сегодня:', error);
    return [];
  }
};
