# Learnify – Micro Learning App

A complete React Native mobile application built with Expo for micro-learning courses.

## Features

- 🔐 **Authentication** - Simple login screen with validation
- 📚 **Course List** - Browse available courses with thumbnails and descriptions
- 📖 **Course Details** - View course information and lesson list
- 🌐 **WebView Integration** - Open lesson content in an embedded web view
- 📊 **Progress Tracking** - Track lesson completion with local storage
- 🔔 **Push Notifications** - Daily learning reminders with Expo Notifications
- 🧭 **Navigation** - Smooth stack navigation between screens
- 🎨 **Modern UI** - Clean, responsive design with loading states
- ⚡ **Error Handling** - Comprehensive error handling throughout the app

## Tech Stack

- **React Native** with **Expo CLI**
- **React Navigation** for navigation
- **Expo Notifications** for push notifications
- **AsyncStorage** for local data persistence
- **React Native WebView** for lesson content
- **Functional Components** with **React Hooks**

## Project Structure

```
Learnify/
├── components/           # Reusable UI components
│   ├── Button.js
│   ├── Card.js
│   └── LoadingSpinner.js
├── screens/             # Screen components
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   ├── CourseDetailScreen.js
│   └── WebViewScreen.js
├── services/            # API and business logic
│   ├── apiService.js
│   └── notificationService.js
├── utils/               # Utility functions and constants
│   ├── constants.js
│   └── helpers.js
├── navigation/          # Navigation configuration
│   └── AppNavigator.js
├── App.js              # Main app component
└── package.json        # Dependencies
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your device (for testing)

### Setup Instructions

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd Learnify
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

5. **Run the app**:
   - **On your device**: Open the Expo Go app and scan the QR code
   - **On iOS simulator**: Press `i` in the terminal
   - **On Android emulator**: Press `a` in the terminal
   - **On web**: Press `w` in the terminal

## Dependencies

### Core Dependencies
- `react` & `react-native` - Core React Native libraries
- `expo` - Expo framework (SDK 54)
- `@react-navigation/native` & `@react-navigation/stack` - Navigation
- `react-native-screens` & `react-native-safe-area-context` - Navigation support

### Feature Dependencies
- `expo-notifications` - Push notifications
- `@react-native-async-storage/async-storage` - Local storage
- `react-native-webview` - WebView component
- `expo-constants` - Expo constants

### Web Support
- `react-dom` - Web rendering
- `react-native-web` - Web compatibility

### Package Versions (Expo SDK 54 Compatible)
```json
{
  "@react-native-async-storage/async-storage": "2.2.0",
  "expo-constants": "18.0.13",
  "expo-notifications": "0.32.16",
  "react-native-safe-area-context": "5.6.0",
  "react-native-screens": "4.16.0",
  "react-native-webview": "13.15.0",
  "react-dom": "19.1.0",
  "react-native-web": "^0.21.0"
}
```

## Usage

### Authentication
- Use any email and password combination to login (demo mode)
- The app validates email format and requires all fields

### Course Navigation
1. **Home Screen** - Browse available courses
2. **Course Detail** - View course information and lessons
3. **WebView** - Read lesson content in embedded browser
4. **Progress** - Mark lessons as completed to track progress

### Features
- **Pull to refresh** on the course list
- **Offline progress tracking** with AsyncStorage
- **Daily notifications** at 6 PM (can be disabled)
- **Responsive design** for different screen sizes
- **Loading states** and error handling

## Mock Data

The app includes mock course data with:
- 5 sample courses (React Native, JavaScript, UI/UX, Redux, API Integration)
- Multiple lessons per course
- Realistic course metadata (duration, level, descriptions)
- Placeholder images from Picsum

## Development

### Code Style
- Functional components with React Hooks
- Clean folder structure
- Reusable components
- Comprehensive error handling
- Modern ES6+ JavaScript

### Key Files
- `App.js` - Main app entry point
- `navigation/AppNavigator.js` - Navigation setup
- `services/apiService.js` - Mock API and course data
- `services/notificationService.js` - Notification management
- `screens/` - All app screens
- `components/` - Reusable UI components

### Customization
- **Theme colors**: Update `utils/constants.js`
- **Course data**: Modify `services/apiService.js`
- **Notification timing**: Update `services/notificationService.js`
- **Navigation**: Edit `navigation/AppNavigator.js`

## Troubleshooting

### Common Issues

1. **Metro bundler issues**:
   ```bash
   npx expo start --clear
   ```

2. **Dependency conflicts**:
   ```bash
   npm install --force
   ```

3. **Cache issues**:
   ```bash
   expo start -c
   ```

4. **Boolean Type Error (RESOLVED)**:
   If you encounter "TypeError: expected dynamic type 'boolean', but had type 'string'", install the correct package versions:
   ```bash
   npm install @react-native-async-storage/async-storage@2.2.0 expo-constants@18.0.13 expo-notifications@0.32.16 react-native-safe-area-context@5.6.0 react-native-screens@4.16.0 react-native-webview@13.15.0
   ```

5. **Web Support Issues**:
   If web doesn't work, install web dependencies:
   ```bash
   npm install react-dom@19.1.0 react-native-web@^0.21.0
   ```

6. **Notification permissions**:
   - Ensure you grant notification permissions on your device
   - Check device settings for notification access

### Known Issues & Solutions

#### Boolean Type Error
- **Issue**: "TypeError: expected dynamic type 'boolean', but had type 'string'"
- **Cause**: Package version incompatibility with Expo SDK 54
- **Solution**: Use specified package versions (see above)
- **Status**: ✅ RESOLVED

#### VirtualizedList Warning
- **Issue**: "VirtualizedLists should never be nested inside plain ScrollViews"
- **Solution**: Used FlatList with ListHeaderComponent
- **Status**: ✅ RESOLVED

#### Navigation Function Warning
- **Issue**: "Non-serializable values were found in the navigation state"
- **Cause**: Passing functions in navigation params
- **Impact**: Non-critical, doesn't affect functionality
- **Status**: ⚠️ Warning only

### Platform-Specific Notes

- **iOS**: Requires Mac for iOS development
- **Android**: Works on all platforms with full notification support
- **Web**: Limited functionality (no notifications, limited storage)
- **Notifications**: 
  - Android: Full support on physical devices
  - iOS: Limited in Expo Go, requires development build for full functionality
  - See: https://docs.expo.dev/develop/development-builds/introduction/

## Contributing

1. Follow the existing code style
2. Add comments for complex logic
3. Test on multiple screen sizes
4. Update documentation for new features

## License

This project is for educational purposes. Feel free to use and modify as needed.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Expo documentation
3. Test on different platforms
4. Verify all dependencies are installed correctly

---

## 🌐 Landing Page

A stunning Apple-style landing page has been created to showcase the Learnify app:

### **Features**
- **Apple-inspired design** with SF Pro Display typography
- **Premium gradients** and smooth animations
- **Responsive layout** for all devices
- **Interactive elements** including 3D phone mockup
- **Professional sections**: Hero, Features, Screenshots, Developer, Footer

### **View the Landing Page**
```bash
# Open in browser
open index.html

# Or serve with a web server
npx serve .
```

### **Technical Details**
- **Pure HTML, CSS, and JavaScript** (no frameworks)
- **CSS Grid and Flexbox** for responsive layouts
- **Intersection Observer API** for scroll animations
- **CSS custom properties** for consistent theming
- **Mobile-first responsive design**

### **Live Preview**
The landing page is available at: `file:///C:/Projects/Learnify/index.html`

### **🔗 Connect with Developer**
- **LinkedIn:** [https://www.linkedin.com/in/dheeraj-nagle-8a37a6197/](https://www.linkedin.com/in/dheeraj-nagle-8a37a6197/)
- **GitHub:** [https://github.com/DheerajNagle](https://github.com/DheerajNagle)

---

## Recent Updates

### 🎯 Major Fixes & Improvements
- ✅ **Fixed Boolean Type Error**: Resolved "TypeError: expected dynamic type 'boolean', but had type 'string'" by updating package versions for Expo SDK 54 compatibility
- ✅ **Fixed VirtualizedList Warning**: Optimized CourseDetailScreen by using FlatList with ListHeaderComponent instead of nested ScrollView
- ✅ **Added Web Support**: Installed react-dom and react-native-web for cross-platform compatibility
- ✅ **Enhanced Error Handling**: Improved loading states and error messages throughout the app
- ✅ **Package Compatibility**: All packages now compatible with Expo SDK 54
- ✅ **Created Apple-Style Landing Page**: Built stunning, portfolio-ready landing page with premium design and smooth animations

### 📱 Platform Enhancements
- **iOS**: Full compatibility with Expo Go, boolean error resolved
- **Android**: Enhanced notification support with proper platform checks
- **Web**: Added web support with responsive design
- **Development**: Improved debugging and development experience

### 🔧 Technical Improvements
- **Navigation**: Optimized performance and eliminated warnings
- **Storage**: Enhanced AsyncStorage usage with proper error handling
- **UI/UX**: Improved loading states and user feedback
- **Code Quality**: Clean component structure and reusable patterns
- **Web Presence**: Added professional Apple-style landing page with modern web technologies

---

**Happy Learning! 🚀**
