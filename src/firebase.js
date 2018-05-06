import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyByXngt98nDWP1jV1jwbRasQdKIRpebrPs",
    authDomain: "new-project-7f8bf.firebaseapp.com",
    databaseURL: "https://new-project-7f8bf.firebaseio.com",
    projectId: "new-project-7f8bf",
    storageBucket: "new-project-7f8bf.appspot.com",
    messagingSenderId: "1007967320698"
};
// const googleProvider = new firebase.auth.GoogleAuthProvider()
firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
