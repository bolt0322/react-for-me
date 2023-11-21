import { initializeApp } from "firebase/app";
// 앱 초기화를 위한 import
import { getFirestore } from "firebase/firestore";
// 데이터베이스(firebase) 사용을 위한 import
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD98rO5_xJlBpzTpo-aMBJVfgPH__qY8uc",
  authDomain: "mbti-react.firebaseapp.com",
  projectId: "mbti-react",
  storageBucket: "mbti-react.appspot.com",
  messagingSenderId: "567571512087",
  appId: "1:567571512087:web:f32d60e57c7c008674d552",
  measurementId: "G-99YF1QCGD2"
};

// firebaseConfig 정보로 firebase 시작
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service


const db = getFirestore(app);
export {db};