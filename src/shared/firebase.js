import firebase from "firebase/compat/app"; // /app 꼭 붙여줘야 한다.
import "firebase/compat/auth"; // firebase v9는 import 하는 방식이 살짝 달라져서 app,auth 앞에 compat을 꼭 넣어줘야 한다!
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtm99WCHVh2sjzVtWSH90MV5Faccx92jY",
  authDomain: "task3-97d16.firebaseapp.com",
  projectId: "task3-97d16",
  storageBucket: "task3-97d16.appspot.com",
  messagingSenderId: "493712511207",
  appId: "1:493712511207:web:c7384526c191d3b344d242",
  measurementId: "G-6678932GLC",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, apiKey, firestore };
