import rootReducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase'; 

var config = {
    apiKey: "AIzaSyAx00b-Fah66IKkU_RcrtntVhSahwUhWZQ",
    authDomain: "bloodbankapp01.firebaseapp.com",
    databaseURL: "https://bloodbankapp01.firebaseio.com",
    projectId: "bloodbankapp01",
    storageBucket: "",
    messagingSenderId: "853697353444"
  };
  firebase.initializeApp(config);


const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);

export default store;