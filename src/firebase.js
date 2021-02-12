import firebase from "firebase";
import "firebase/database";

let config = {
  apiKey: "AIzaSyCGdYhu0xhSlmQARuS4d-O8FSON554S-94",
    authDomain: "donna-fc39e.firebaseapp.com",
    databaseURL: "https://donna-fc39e-default-rtdb.firebaseio.com",
    projectId: "donna-fc39e",
    storageBucket: "donna-fc39e.appspot.com",
    messagingSenderId: "312229191400",
    appId: "1:312229191400:web:1a736ec9f4877a564bb35d",
    
};

firebase.initializeApp(config);

export default firebase.database();