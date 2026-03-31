import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewScreen = ({ route, navigation }) => {
  const { lessonTitle, lessonUrl, courseId, lessonId, onLessonCompleted } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({ title: lessonTitle });
  }, [lessonTitle, navigation]);

  const handleWebViewLoad = () => {
    setLoading(false);
    setError(null);
  };

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    setError(`Failed to load content: ${nativeEvent.description}`);
    setLoading(false);
  };

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };

  const handleGoBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    } else {
      navigation.goBack();
    }
  };

  const handleGoForward = () => {
    if (webViewRef.current && canGoForward) {
      webViewRef.current.goForward();
    }
  };

  const handleReload = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const markLessonCompleted = async () => {
    try {
      // Load current progress
      const storedProgress = await AsyncStorage.getItem(`course_${courseId}_progress`);
      let progress = storedProgress ? JSON.parse(storedProgress) : [];
      
      // Add lesson to progress if not already completed
      if (!progress.includes(lessonId)) {
        progress = [...progress, lessonId];
        await AsyncStorage.setItem(`course_${courseId}_progress`, JSON.stringify(progress));
        
        // Call the callback if provided
        if (onLessonCompleted) {
          onLessonCompleted(lessonId);
        }
      }
      
      Alert.alert(
        'Lesson Completed!',
        'Great job! This lesson has been marked as completed.',
        [{ text: 'OK', style: 'default' }]
      );
    } catch (error) {
      console.error('Error marking lesson as completed:', error);
      Alert.alert('Error', 'Failed to save progress');
    }
  };

  const renderLoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#6366f1" />
      <Text style={styles.loadingText}>Loading lesson content...</Text>
    </View>
  );

  const renderErrorView = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Failed to Load Content</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleReload}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const renderToolbar = () => (
    <View style={styles.toolbar}>
      <TouchableOpacity
        style={[styles.toolbarButton, !canGoBack && styles.toolbarButtonDisabled]}
        onPress={handleGoBack}
        disabled={!canGoBack}
      >
        <Text style={styles.toolbarButtonText}>←</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.toolbarButton, !canGoForward && styles.toolbarButtonDisabled]}
        onPress={handleGoForward}
        disabled={!canGoForward}
      >
        <Text style={styles.toolbarButtonText}>→</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.toolbarButton} onPress={handleReload}>
        <Text style={styles.toolbarButtonText}>↻</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.completeButton}
        onPress={markLessonCompleted}
      >
        <Text style={styles.completeButtonText}>Mark Complete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading && renderLoadingIndicator()}
      
      {error ? (
        renderErrorView()
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: lessonUrl || 'https://example.com' }}
          style={styles.webView}
          onLoad={handleWebViewLoad}
          onError={handleWebViewError}
          onNavigationStateChange={handleNavigationStateChange}
          startInLoadingState={true}
          renderLoading={renderLoadingIndicator}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      )}
      
      {!error && renderToolbar()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
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
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  webView: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  toolbarButton: {
    backgroundColor: '#6366f1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  toolbarButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  toolbarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completeButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default WebViewScreen;
