// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1GWC-gbzPCpmcpq8tYrv2ANoHfrzvw34",
  authDomain: "easyrec-1ab7c.firebaseapp.com",
  projectId: "easyrec-1ab7c",
  storageBucket: "easyrec-1ab7c.firebasestorage.app",
  messagingSenderId: "244761004144",
  appId: "1:244761004144:web:940ebed5bf91ec417eccb5",
  measurementId: "G-6PYNN9C4D6"
};




// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);// Initialize Firebase Auth provider
const analytics = getAnalytics(firebaseApp);
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);