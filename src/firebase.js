// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore, collection, addDoc, getDocs, writeBatch, doc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAcEErqrHnR9kj22XXILjrThfvHsTYHY9A',
	authDomain: 'anki-a7369.firebaseapp.com',
	projectId: 'anki-a7369',
	storageBucket: 'anki-a7369.appspot.com',
	messagingSenderId: '419747918718',
	appId: '1:419747918718:web:0ea2d04d3309940740392f',
	measurementId: 'G-BQVGZSW16F'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app); // Use the initialized app

export { db, collection, addDoc, getDocs, writeBatch, doc }; // Export the functions you need
