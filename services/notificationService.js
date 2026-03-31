import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Configure notification handler
if (Platform.OS === 'android') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
}

class NotificationService {
  static async requestPermissions() {
    if (Platform.OS !== 'web') {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return false;
      }
      return true;
    }
    return false;
  }

  static async scheduleLearningReminder() {
    try {
      // Cancel any existing notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Schedule daily reminder at 6 PM
      const trigger = {
        hour: 18, // 6 PM
        minute: 0,
        repeats: true,
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Continue Your Learning! 📚',
          body: 'Don\'t forget to continue your course today. Keep up the great work!',
          data: { type: 'learning_reminder' },
        },
        trigger,
      });

      console.log('Learning reminder scheduled successfully');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  static async scheduleCustomReminder(title, body, delaySeconds = 10) {
    try {
      const trigger = {
        seconds: delaySeconds,
      };

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { type: 'custom_reminder' },
        },
        trigger,
      });

      console.log('Custom reminder scheduled successfully');
    } catch (error) {
      console.error('Error scheduling custom notification:', error);
    }
  }

  static async sendImmediateNotification(title, body) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data: { type: 'immediate' },
        },
        trigger: null, // Show immediately
      });

      console.log('Immediate notification sent successfully');
    } catch (error) {
      console.error('Error sending immediate notification:', error);
    }
  }

  static async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
    }
  }

  static async getScheduledNotifications() {
    try {
      const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
      console.log('Scheduled notifications:', scheduledNotifications);
      return scheduledNotifications;
    } catch (error) {
      console.error('Error getting scheduled notifications:', error);
      return [];
    }
  }

  static async initializeNotifications() {
    try {
      // Request permissions
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        return false;
      }

      // Set up notification listeners
      Notifications.addNotificationReceivedListener((notification) => {
        console.log('Notification received:', notification);
      });

      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response received:', response);
        // Handle notification tap here
        this.handleNotificationTap(response.notification);
      });

      // Check if notifications were previously enabled
      const notificationsEnabled = await AsyncStorage.getItem('notifications_enabled');
      if (notificationsEnabled === 'true') {
        await this.scheduleLearningReminder();
      }

      return true;
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  }

  static async handleNotificationTap(notification) {
    const { data } = notification.request.content;
    
    switch (data?.type) {
      case 'learning_reminder':
        // Navigate to home screen when learning reminder is tapped
        // This would typically be handled by navigation
        console.log('Learning reminder tapped - navigate to courses');
        break;
      case 'custom_reminder':
        console.log('Custom reminder tapped');
        break;
      default:
        console.log('Unknown notification type tapped');
    }
  }

  static async enableNotifications() {
    try {
      await AsyncStorage.setItem('notifications_enabled', 'true');
      await this.scheduleLearningReminder();
      console.log('Notifications enabled');
    } catch (error) {
      console.error('Error enabling notifications:', error);
    }
  }

  static async disableNotifications() {
    try {
      await AsyncStorage.setItem('notifications_enabled', 'false');
      await this.cancelAllNotifications();
      console.log('Notifications disabled');
    } catch (error) {
      console.error('Error disabling notifications:', error);
    }
  }

  static async isNotificationEnabled() {
    try {
      const enabled = await AsyncStorage.getItem('notifications_enabled');
      return enabled === 'true';
    } catch (error) {
      console.error('Error checking notification status:', error);
      return false;
    }
  }

  static async sendProgressNotification(courseTitle, progress) {
    try {
      const isEnabled = await this.isNotificationEnabled();
      if (!isEnabled) return;

      await this.sendImmediateNotification(
        'Great Progress! 🎉',
        `You've completed ${progress}% of ${courseTitle}. Keep going!`
      );
    } catch (error) {
      console.error('Error sending progress notification:', error);
    }
  }

  static async sendCourseCompletionNotification(courseTitle) {
    try {
      const isEnabled = await this.isNotificationEnabled();
      if (!isEnabled) return;

      await this.sendImmediateNotification(
        'Course Completed! 🏆',
        `Congratulations! You've completed ${courseTitle}.`
      );
    } catch (error) {
      console.error('Error sending completion notification:', error);
    }
  }
}

export default NotificationService;
