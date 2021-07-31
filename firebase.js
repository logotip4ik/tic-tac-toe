import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDtWw1nR426v6p3M-BMCKwizqimI7tnPmI',
  authDomain: 'tic-tac-toe-8037e.firebaseapp.com',
  projectId: 'tic-tac-toe-8037e',
  storageBucket: 'tic-tac-toe-8037e.appspot.com',
  messagingSenderId: '1041126153009',
  appId: '1:1041126153009:web:408ad7d0b28b18d701ee10',
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export const fire = firebase
