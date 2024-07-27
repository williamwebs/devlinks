// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage  } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG1nlgbJ1iVq1U5BHMp7aHJWEtJUp496w",
  authDomain: "devlinks-b3105.firebaseapp.com",
  projectId: "devlinks-b3105",
  storageBucket: "devlinks-b3105.appspot.com",
  messagingSenderId: "1003030137996",
  appId: "1:1003030137996:web:18b84ad46c481f44c5bfa9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { app, storage };
