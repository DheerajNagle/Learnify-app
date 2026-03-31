// App constants and configuration

export const COLORS = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#10b981',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#f8fafc',
  surface: '#fff',
  text: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  shadow: '#000',
};

export const SIZES = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const SPACING = {
  padding: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  margin: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
};

export const ANIMATION = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
};

export const STORAGE_KEYS = {
  USER_PROGRESS: 'user_progress',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  USER_PREFERENCES: 'user_preferences',
  COURSE_PROGRESS: 'course_',
};

export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  BASE_URL: 'https://api.example.com',
};

export const NOTIFICATION_TIMES = {
  DAILY_REMINDER: { hour: 18, minute: 0 }, // 6 PM
  WEEKLY_SUMMARY: { weekday: 1, hour: 10, minute: 0 }, // Monday 10 AM
};
