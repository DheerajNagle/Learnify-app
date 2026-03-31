import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../services/apiService';

const CourseDetailScreen = ({ route, navigation }) => {
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    loadCourseData();
    loadProgress();
  }, [courseId]);

  const loadCourseData = async () => {
    try {
      const courseData = await ApiService.getCourseById(courseId);
      setCourse(courseData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load course details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = async () => {
    try {
      const storedProgress = await AsyncStorage.getItem(`course_${courseId}_progress`);
      if (storedProgress) {
        setCompletedLessons(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const saveProgress = async (progress) => {
    try {
      await AsyncStorage.setItem(`course_${courseId}_progress`, JSON.stringify(progress));
      setCompletedLessons(progress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const toggleLessonCompletion = (lessonId) => {
    const newProgress = completedLessons.includes(lessonId)
      ? completedLessons.filter(id => id !== lessonId)
      : [...completedLessons, lessonId];
    
    saveProgress(newProgress);
  };

  const handleLessonPress = (lesson) => {
    navigation.navigate('WebView', {
      lessonTitle: lesson.title,
      lessonUrl: lesson.url,
      courseId,
      lessonId: lesson.id,
      onLessonCompleted: toggleLessonCompletion,
    });
  };

  const renderLessonItem = ({ item }) => {
    const isCompleted = completedLessons.includes(item.id);
    
    return (
      <TouchableOpacity
        style={styles.lessonItem}
        onPress={() => handleLessonPress(item)}
      >
        <View style={styles.lessonContent}>
          <View style={styles.lessonInfo}>
            <Text style={[styles.lessonTitle, isCompleted && styles.completedText]}>
              {item.title}
            </Text>
            <Text style={styles.lessonDuration}>{item.duration}</Text>
          </View>
          <TouchableOpacity
            style={[styles.checkbox, isCompleted && styles.checkboxChecked]}
            onPress={() => toggleLessonCompletion(item.id)}
          >
            {isCompleted && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const calculateProgress = () => {
    if (!course) return 0;
    return Math.round((completedLessons.length / course.lessons.length) * 100);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading course...</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Course not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: course.thumbnail }} style={styles.courseImage} />
      
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDescription}>{course.description}</Text>
        
        <View style={styles.courseMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Duration</Text>
            <Text style={styles.metaValue}>{course.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Level</Text>
            <Text style={styles.metaValue}>{course.level}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Progress</Text>
            <Text style={styles.metaValue}>{calculateProgress()}%</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[styles.progressFill, { width: `${calculateProgress()}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {completedLessons.length} of {course.lessons.length} lessons completed
          </Text>
        </View>

        <Text style={styles.lessonsTitle}>Lessons</Text>
        
        <FlatList
          data={course.lessons}
          renderItem={renderLessonItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.lessonsList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
  },
  courseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  courseInfo: {
    padding: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  courseDescription: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
    marginBottom: 20,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  lessonsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  lessonsList: {
    marginBottom: 20,
  },
  lessonItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  lessonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  completedText: {
    color: '#10b981',
  },
  lessonDuration: {
    fontSize: 14,
    color: '#64748b',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkboxChecked: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CourseDetailScreen;
