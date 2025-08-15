import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Your Firebase configuration object
// Replace these values with your actual Firebase config from your friend
const firebaseConfig = {
    apiKey: "AIzaSyCcxUL0kw1mJSzOnOwQuIXeqmBOtGo9e4Y",
    authDomain: "repo-ai-the-code-blush.firebaseapp.com",
    projectId: "repo-ai-the-code-blush",
    storageBucket: "repo-ai-the-code-blush.firebasestorage.app",
    messagingSenderId: "764504168566",
    appId: "1:764504168566:web:4b8921f57b942d66bc2757",
    measurementId: "G-67W48K5ES8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Debug: Log to ensure Firebase is initialized
console.log('Firebase app initialized:', app);
console.log('Firebase auth initialized:', auth);

export default app;
