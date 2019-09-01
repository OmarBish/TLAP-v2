/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import firebase from 'firebase/app'
import 'firebase/firestore'
let db = firebase.firestore();

const actions = {
  joinContest({commit},payload){
    let current_contest = {
      contest_id:payload.id,
      name:payload.name,
      start_time:firebase.firestore.Timestamp.now(),
      duration:payload.duration
    }
    db.collection("users").doc(JSON.parse(localStorage.getItem('userInfo')).uid).update({
      current_contest:current_contest
    }).then( () => {
      commit('updateCurrentContest',current_contest)
    }).catch((err)=>{
      console.error(err);
    });
  },
  getCurrentContestData({commit}){
    db.collection("users").doc(JSON.parse(localStorage.getItem('userInfo')).uid)
    .get().then( (doc) => {
      commit('updateCurrentContest',doc.data().current_contest)
    }).catch((err)=>{
      console.error(err);
    });
  }

}

export default actions
