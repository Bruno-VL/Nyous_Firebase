import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCNfh-mRu5VO5zt0N8bvpl8UkVVTgs_92w",
    authDomain: "nyous-272a8.firebaseapp.com",
    projectId: "nyous-272a8",
    storageBucket: "nyous-272a8.appspot.com",
    messagingSenderId: "478822402688",
    appId: "1:478822402688:web:edfe62c4034d37c38bf465",
    measurementId: "G-JT453LZZ4D"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();
export const storage = app.storage();

export default firebaseConfig;