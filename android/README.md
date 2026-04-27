# Android Platform

Эта папка содержит нативный Android проект React Native приложения.

## Инициализация

Для инициализации Android проекта выполните следующие команды:

```bash
cd android
./gradlew clean
cd ..
```

## Требования

- Android Studio (последняя версия)
- Android SDK (устанавливается через Android Studio)
- JDK 17 или выше

## Настройка переменных окружения

### Windows
Добавьте в системные переменные:
```
ANDROID_HOME=C:\Users\<User>\AppData\Local\Android\Sdk
```

### macOS/Linux
Добавьте в `~/.bashrc` или `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Запуск на эмуляторе

1. Создайте эмулятор в Android Studio (AVD Manager)
2. Запустите эмулятор
3. Выполните команду:
```bash
npm run android
# или
npx react-native run-android
```

## Запуск на реальном устройстве

1. Включите отладку по USB на устройстве
2. Подключите устройство к компьютеру
3. Проверьте подключение: `adb devices`
4. Выполните команду:
```bash
npx react-native run-android
```

## Примечание

Если папка пуста, это нормально - React Native CLI создаст необходимые файлы при первом запуске команды `npx react-native run-android`.

Альтернативно, вы можете вручную создать структуру Android проекта:

```bash
npx @react-native-community/cli init ProductivityApp --directory .
```

Но будьте осторожны - эта команда может перезаписать существующие файлы.
