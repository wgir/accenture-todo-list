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


## APK Generated

[app-todo-debug.apk](https://github.com/wgir/accenture-todo-list/blob/main/app-todo-debug.apk)

## Compiling for Mobile (Cordova)

### Android
For a streamlined build process that avoids common CLI conflicts and automatically renames the output APKs, use the following commands:

#### 1. Generate Debug APK (For Testing)
```bash
npm run build:android
```
- **Output**: `app-todo-debug.apk` (in the project root)
- **Use case**: Quick testing on emulator or physical device.

#### 2. Generate Release APK (For Production)
```bash
npm run build:android-release
```
- **Output**: `app-todo-release.apk` (in the project root)
- **Use case**: Final version for testing. 
- *Note: This APK is **unsigned**. You will need to sign it with a Keystore before installing on a physical device.*

#### Manual Steps (If needed):
1. **Build the Web project**: `npm run build`
2. **Build the Android APK**: `ionic cordova build android --no-build`

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

## Firebase and Remote Config

![Firebase and Remote Config](docs/config-server.png)

## Optimization

1. **Lazy Loading**: Implemented lazy loading for feature modules to reduce initial bundle size.
2. **Tree Shaking**: Utilized tree shaking to remove unused code.
3. **Code Splitting**: Implemented code splitting to split the application into smaller chunks.
4. **Pagination**: Implemented pagination for task list to reduce memory usage and improve performance.
5. **Minification**: Implemented minification for CSS and JavaScript files to reduce file size.
6. **Gzip Compression**: Implemented gzip compression for API responses to reduce network transfer size.