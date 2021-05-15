import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCMM1LhOYESfhRn5DNxd9T_vTk9qI_ynis",
    authDomain: "whatsapprclone.firebaseapp.com",
    projectId: "whatsapprclone",
    storageBucket: "whatsapprclone.appspot.com",
    messagingSenderId: "1041644501820",
    appId: "1:1041644501820:web:b4c164c3153b9a0fce3c39",
    measurementId: "G-R2TS4EJ5H7"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig)
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();
  export{auth,provider}
  export default db;