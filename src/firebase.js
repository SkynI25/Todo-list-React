import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD9GMTNK7vsbfg6_E5FSOxVwS4haKPR9w4',
  authDomain: 'react-todo-list-e3fbd.firebaseapp.com',
  databaseURL: 'https://react-todo-list-e3fbd.firebaseio.com',
  projectId: 'react-todo-list-e3fbd',
  storageBucket: 'react-todo-list-e3fbd.appspot.com',
  messagingSenderId: '417353769741',
  appId: '1:417353769741:web:72629ddb70d20535338644',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const firebaseAPI = () => {
  return new Promise(function (res, rej) {
    const result = [];
    db.collection('todos')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          result.push(doc.data());
        });
        res(result);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  });
};

export { db, firebaseAPI };
