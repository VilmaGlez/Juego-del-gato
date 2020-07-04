import firebase from "firebase";

require("firebase/firestore");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCQaR5C_Zc-xsvfJEpoWMVaecO6aGsFwbI",
  authDomain: "alumnos-app-ae40a.firebaseapp.com",
  databaseURL: "https://alumnos-app-ae40a.firebaseio.com",
  projectId: "alumnos-app-ae40a",
  storageBucket: "alumnos-app-ae40a.appspot.com",
  messagingSenderId: "483063690686",
  appId: "1:483063690686:web:f7be48c8df4e93966635ef"
};

firebase.initializeApp(config);

export default firebase;