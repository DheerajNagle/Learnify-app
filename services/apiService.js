// Mock API service for course data

const mockCourses = [
  {
    id: 1,
    title: 'React Native Basics',
    description: 'Learn the fundamentals of React Native and build your first mobile app',
    thumbnail: 'https://picsum.photos/seed/react-native/400/200.jpg',
    duration: '2 hours',
    level: 'Beginner',
    lessons: [
      {
        id: 1,
        title: 'Introduction to React Native',
        duration: '15 min',
        url: 'https://reactnative.dev/docs/getting-started',
        completed: false,
      },
      {
        id: 2,
        title: 'Setting Up Development Environment',
        duration: '20 min',
        url: 'https://reactnative.dev/docs/environment-setup',
        completed: false,
      },
      {
        id: 3,
        title: 'Creating Your First App',
        duration: '25 min',
        url: 'https://reactnative.dev/docs/tutorial',
        completed: false,
      },
      {
        id: 4,
        title: 'Understanding Components',
        duration: '30 min',
        url: 'https://reactnative.dev/docs/components-and-props',
        completed: false,
      },
      {
        id: 5,
        title: 'Styling and Layout',
        duration: '30 min',
        url: 'https://reactnative.dev/docs/flexbox',
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript programming',
    thumbnail: 'https://picsum.photos/seed/javascript/400/200.jpg',
    duration: '3 hours',
    level: 'Beginner',
    lessons: [
      {
        id: 1,
        title: 'Variables and Data Types',
        duration: '20 min',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types',
        completed: false,
      },
      {
        id: 2,
        title: 'Functions and Scope',
        duration: '25 min',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions',
        completed: false,
      },
      {
        id: 3,
        title: 'Arrays and Objects',
        duration: '30 min',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects',
        completed: false,
      },
      {
        id: 4,
        title: 'ES6 Features',
        duration: '35 min',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference',
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Learn the principles of great user interface and experience design',
    thumbnail: 'https://picsum.photos/seed/design/400/200.jpg',
    duration: '2.5 hours',
    level: 'Intermediate',
    lessons: [
      {
        id: 1,
        title: 'Design Thinking Basics',
        duration: '25 min',
        url: 'https://www.interaction-design.org/literature/topics/design-thinking',
        completed: false,
      },
      {
        id: 2,
        title: 'Color Theory and Typography',
        duration: '30 min',
        url: 'https://www.interaction-design.org/literature/topics/color-theory',
        completed: false,
      },
      {
        id: 3,
        title: 'Layout and Composition',
        duration: '35 min',
        url: 'https://www.interaction-design.org/literature/topics/layout-composition',
        completed: false,
      },
      {
        id: 4,
        title: 'Mobile Design Patterns',
        duration: '30 min',
        url: 'https://www.interaction-design.org/literature/topics/mobile-design-patterns',
        completed: false,
      },
    ],
  },
  {
    id: 4,
    title: 'State Management with Redux',
    description: 'Learn how to manage application state with Redux',
    thumbnail: 'https://picsum.photos/seed/redux/400/200.jpg',
    duration: '2 hours',
    level: 'Advanced',
    lessons: [
      {
        id: 1,
        title: 'Introduction to State Management',
        duration: '20 min',
        url: 'https://redux.js.org/tutorials/fundamentals/part-1-overview',
        completed: false,
      },
      {
        id: 2,
        title: 'Redux Core Concepts',
        duration: '30 min',
        url: 'https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow',
        completed: false,
      },
      {
        id: 3,
        title: 'Actions and Reducers',
        duration: '25 min',
        url: 'https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers',
        completed: false,
      },
      {
        id: 4,
        title: 'Using Redux with React',
        duration: '25 min',
        url: 'https://redux.js.org/tutorials/fundamentals/part-5-ui-react',
        completed: false,
      },
    ],
  },
  {
    id: 5,
    title: 'API Integration',
    description: 'Learn how to integrate RESTful APIs in your mobile applications',
    thumbnail: 'https://picsum.photos/seed/api/400/200.jpg',
    duration: '1.5 hours',
    level: 'Intermediate',
    lessons: [
      {
        id: 1,
        title: 'Understanding REST APIs',
        duration: '20 min',
        url: 'https://restfulapi.net/',
        completed: false,
      },
      {
        id: 2,
        title: 'Making HTTP Requests',
        duration: '25 min',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
        completed: false,
      },
      {
        id: 3,
        title: 'Handling API Responses',
        duration: '20 min',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Response',
        completed: false,
      },
      {
        id: 4,
        title: 'Error Handling Best Practices',
        duration: '25 min',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
        completed: false,
      },
    ],
  },
];

class ApiService {
  // Simulate API delay
  static delay(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all courses
  static async getCourses() {
    await this.delay(800); // Simulate network delay
    return mockCourses;
  }

  // Get course by ID
  static async getCourseById(courseId) {
    await this.delay(500);
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  // Get lesson by course ID and lesson ID
  static async getLessonById(courseId, lessonId) {
    await this.delay(300);
    const course = mockCourses.find(c => c.id === courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    
    return lesson;
  }

  // Mark lesson as completed (simulate API call)
  static async markLessonCompleted(courseId, lessonId) {
    await this.delay(200);
    // In a real app, this would make an API call
    return { success: true, courseId, lessonId };
  }
}

export default ApiService;
