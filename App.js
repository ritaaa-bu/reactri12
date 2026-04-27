/**
 * ProductivityApp - Мобильное приложение для повышения личной продуктивности
 * 
 * Главный файл приложения (entry point)
 * Инициализирует провайдеры и навигацию
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Импорт контекста темы
import { ThemeProvider } from './src/theme/themeContext';

// Импорт навигатора
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Основной компонент приложения
 * Оборачивает всё приложение в необходимые провайдеры:
 * - GestureHandlerRootView - для жестов (требуется react-navigation)
 * - SafeAreaProvider - для безопасных зон на устройствах с вырезами
 * - ThemeProvider - для управления темой (светлая/тёмная)
 */
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          {/* StatusBar адаптируется под тему автоматически через контекст */}
          <StatusBar barStyle="dark-content" />
          <AppNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
