# iOS Platform

Эта папка содержит нативный iOS проект React Native приложения.

## Инициализация

Для инициализации iOS проекта выполните следующие команды:

```bash
cd ios
pod install
cd ..
```

## Требования

- macOS
- Xcode (последняя версия из App Store)
- CocoaPods (`sudo gem install cocoapods`)

## Запуск на симуляторе

```bash
npm run ios
# или
npx react-native run-ios
```

## Запуск на реальном устройстве

1. Откройте `ios/ProductivityApp.xcworkspace` в Xcode
2. Выберите ваше устройство в списке устройств
3. Нажмите Run (▶️)

## Примечание

Если папка пуста, это нормально - React Native CLI создаст необходимые файлы при первом запуске команды `npx react-native run-ios`.
