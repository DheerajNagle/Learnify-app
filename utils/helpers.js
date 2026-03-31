// Utility helper functions

export const formatDuration = (duration) => {
  return duration;
};

export const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

export const getLevelColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'beginner':
      return '#10b981';
    case 'intermediate':
      return '#f59e0b';
    case 'advanced':
      return '#ef4444';
    default:
      return '#6366f1';
  }
};

export const getLevelBackgroundColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'beginner':
      return '#d1fae5';
    case 'intermediate':
      return '#fed7aa';
    case 'advanced':
      return '#fee2e2';
    default:
      return '#dbeafe';
  }
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const formatError = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const getTimeAgo = (date) => {
  if (!date) return '';
  
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  
  return 'just now';
};

export const sortByDate = (array, dateKey = 'createdAt', order = 'desc') => {
  return array.sort((a, b) => {
    const dateA = new Date(a[dateKey]);
    const dateB = new Date(b[dateKey]);
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const group = item[key];
    result[group] = result[group] || [];
    result[group].push(item);
    return result;
  }, {});
};

export const searchInArray = (array, searchTerm, searchFields) => {
  if (!searchTerm) return array;
  
  return array.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });
};
