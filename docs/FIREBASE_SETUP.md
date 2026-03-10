# Firebase Setup Guide

Follow these steps to connect your Force Per4mance website to Firebase.

## 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name it `force-per4mance`.
3. (Optional) Disable Google Analytics for this project.

## 2. Register Web App
1. In the Project Overview, click the **Web icon (`</>`)**.
2. Register the app with a nickname (e.g., `fp4-web`).
3. **Copy the `firebaseConfig` object.** You will need these keys later.

## 3. Enable Services
### Authentication
1. Go to **Build > Authentication**.
2. Click **Get Started**.
3. Enable **Email/Password** as a sign-in provider.

### Firestore Database
1. Go to **Build > Firestore Database**.
2. Click **Create database**.
3. Select **Start in test mode** (for initial development) and choose a location.

### Storage
1. Go to **Build > Storage**.
2. Click **Get Started**.
3. Select **Start in test mode** and choose a location.

## 4. Add Configuration to Project
Once you have your `firebaseConfig`, I will help you add it to a new file: `js/firebase-config.js`.

```javascript
/* Placeholder for your Firebase Config */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```
