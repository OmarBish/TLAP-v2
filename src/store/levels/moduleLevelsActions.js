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
  fetchLevels({commit}){
    let current_contest = JSON.parse(localStorage.getItem('userInfo')).current_contest
    db.collection("contests").doc(current_contest.contest_id)
    .collection('levels').get()
    .then( (querySnapshot) => {
      let levels =[]
      querySnapshot.forEach((doc) => {
        const level = {
          id:doc.id,
          name:doc.data().name,
          difficulty:doc.data().difficulty,
          score:doc.data().score,
        }
        levels.push(level);
      });
      commit('setLevels',levels)
    });
  },
  addLevel({commit},payload){
    let current_contest = JSON.parse(localStorage.getItem('userInfo')).current_contest
    let data = payload.level
    db.collection('contests').doc(current_contest.contest_id)
    .collection('levels').add(data)
    .then((res)=>{
      data.id = res.id
      payload.notify({
        title:'Success',
        text:'Level added successfuly',
        color:'success'
      })
      commit('addLevel',data);
    }).catch((err)=>{
      payload.notify({
        title: 'Error',
        text: err,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
    })
    })

  }
}

export default actions
