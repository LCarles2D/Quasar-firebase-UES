import { boot } from 'quasar/wrappers'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { VueFire } from 'vuefire'
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Required for side-effects
// TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBOkaLIttg6W00oRRSC1wf-O3ljxpN6Rxg",
   authDomain: "test-quasar-1fc2b.firebaseapp.com",
   projectId: "test-quasar-1fc2b",
   storageBucket: "test-quasar-1fc2b.appspot.com",
   messagingSenderId: "105864631825",
   appId: "1:105864631825:web:99d49debdae44714c8c3b0",
   measurementId: "G-ZHSSP2QZPB"
};
//               // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.languageCode = 'es';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ( { app } ) => {
  // something to do
  app.use(VueFire, {
    // imported above but could also just be created here
    app,
    modules: [
      // we will see other modules later on
    ],
})

})

export { db, auth, provider };
