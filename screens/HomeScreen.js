import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import ApiService from '../services/apiService';

const HomeScreen = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const loadCourses = async () => {
    try {
      setError(null);
      const coursesData = await ApiService.getCourses();
      setCourses(coursesData);
    } catch (err) {
      setError('Failed to load courses. Please try again.');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadCourses();
  };

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.courseMeta}>
          <Text style={styles.duration}>{item.duration}</Text>
          <Text style={styles.level}>{item.level}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Courses Available</Text>
      <Text style={styles.emptyStateText}>
        Please check your internet connection and try again.
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading courses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#6366f1']}
          />
        }
        ListEmptyComponent={error ? renderEmptyState() : null}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  listContainer: {
    padding: 16,
  },
  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  courseInfo: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 12,
  },
  courseMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '500',
  },
  level: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default HomeScreen;
