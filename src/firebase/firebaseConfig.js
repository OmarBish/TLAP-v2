// NOTE
// Please use your own firebase details below. For more details visit: https://pixinvent.com/demo/vuesax-vuejs-admin-dashboard-template/documentation/development/firebaseIntegration.html


import firebase from 'firebase/app'

// Initialize Firebase
//TODO add to git ignore
var config = {
    apiKey: "AIzaSyA_fo7aX8Yp2AK2xPkW1tIfOM3_1XNPnps",
    authDomain: "tlap-e9cd6.firebaseapp.com",
    databaseURL: "https://tlap-e9cd6.firebaseio.com",
    projectId: "tlap-e9cd6",
    storageBucket: "tlap-e9cd6.appspot.com",
    messagingSenderId: "259568810278",
    appId: "1:259568810278:web:1a9bd6ac6be43a4a"
};

firebase.initializeApp(config);
