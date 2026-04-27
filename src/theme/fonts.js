// src/theme/fonts.js
// Типографика и стили шрифтов
// Используем системные шрифты (SF Pro на iOS, Roboto на Android)
// с кастомными стилями для современного вида

export const fonts = {
  // Размеры шрифтов (масштабируемые)
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },

  // Насыщенность шрифта
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Межстрочный интервал (для лучшей читаемости)
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Межбуквенный интервал (для современного вида)
  letterSpacings: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Готовые текстовые стили для использования в компонентах
export const textStyles = {
  // Заголовки
  h1: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    lineHeight: fonts.lineHeights.tight * fonts.sizes.xxl,
    letterSpacing: fonts.letterSpacings.tight,
  },
  h2: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.semibold,
    lineHeight: fonts.lineHeights.tight * fonts.sizes.xl,
    letterSpacing: fonts.letterSpacings.normal,
  },
  h3: {
    fontSize: fonts.sizes.lg,
    fontWeight: fonts.weights.semibold,
    lineHeight: fonts.lineHeights.normal * fonts.sizes.lg,
  },

  // Основной текст
  body: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.regular,
    lineHeight: fonts.lineHeights.normal * fonts.sizes.md,
  },
  bodySmall: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.regular,
    lineHeight: fonts.lineHeights.relaxed * fonts.sizes.sm,
  },

  // Подписи и вторичный текст
  caption: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.medium,
    lineHeight: fonts.lineHeights.normal * fonts.sizes.xs,
    letterSpacing: fonts.letterSpacings.wide,
  },
};
