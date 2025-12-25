# To-Do List App (Ionic + Angular Standalone)

This application is a modern to-do list with category management, built using Ionic and Angular Standalone components.

## Features
- Add, complete, and delete tasks.
- Categorize tasks with custom colors.
- Filter tasks by category.
- Local storage persistence.
- Premium dark mode UI.

## Prerequisites
- **Node.js**: v18 or later.
- **Ionic CLI**: `npm install -g @ionic/cli`.
- **Java JDK**: JDK 17 or 21 (recommended).
- **Android SDK**: With Command Line Tools and Build Tools installed.
- **Gradle**: Installed and in your PATH.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run locally**:
   ```bash
   ionic serve
   ```

## Compiling for Mobile (Cordova)

### Android
Due to recent changes in Angular Standalone and Ionic CLI, use the following steps for a successful build:

1. **Build the Web project**:
   ```bash
   npm run build
   ```

2. **Build the Android APK**:
   ```bash
   ionic cordova build android --no-build
   ```
   *Note: If environment variables like `JAVA_HOME` are not set, make sure to configure them first.*

### iOS
1. **Build the Web project**:
   ```bash
   npm run build
   ```

2. **Build the iOS app**:
   ```bash
   ionic cordova build ios --no-build
   ```

## Troubleshooting
If you encounter `Error: Unknown argument: platform`, it is because the Ionic script is trying to pass a flag to the new Angular builder that it doesn't recognize. Using the `--no-build` flag as shown above skips this step and uses the already compiled `www` folder.
