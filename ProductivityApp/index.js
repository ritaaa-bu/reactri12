/**
 * Точка входа приложения React Native
 * Регистрирует главный компонент App
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Регистрируем компонент App с именем из app.json
// Это необходимо для того, чтобы нативная часть (iOS/Android) знала,
// какой React-компонент рендерить при запуске приложения
AppRegistry.registerComponent(appName, () => App);
