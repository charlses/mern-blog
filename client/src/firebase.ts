// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'davits-blog.firebaseapp.com',
  projectId: 'davits-blog',
  storageBucket: 'davits-blog.appspot.com',
  messagingSenderId: '552289216442',
  appId: '1:552289216442:web:5f111f7acdb59c9bf75f83'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
