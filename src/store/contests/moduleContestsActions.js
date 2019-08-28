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
  fetchContests({commit}){
    db.collection("contests").get().then( (querySnapshot) => {
      let contests =[]
      querySnapshot.forEach((doc) => {
        const contest = {
          id:doc.id,
          name:doc.data().name,
          imgURL:doc.data().imgURL,
          description:doc.data().description,
          active:doc.data().active,
          duration:doc.data().duration
        }
        contests.push(contest);
      });
      commit('setContests',contests)
    });
  },
  deleteContest({commit},payload){
    console.log('delete payload', payload)
    let id =payload.id;
    db.collection('contests').doc(id).delete().then( () => {
      commit('deleteContest',id);
    }).catch((err)=>{
      console.error(err)
      payload.notify({
          time: 8800,
          title: 'Error',
          text: err,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
      })
    });
  },
  disableContest({commit},payload){
    let id =payload.id;
    db.collection('contests').doc(id).update({
      active:false
    }).then( () => {
      commit('disableContest',id);
    }).catch((err)=>{
      console.error(err)
      payload.notify({
          time: 8800,
          title: 'Error',
          text: err,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
      })
    });
  },
  activateContest({commit},payload){
    let id =payload.id;
    db.collection('contests').doc(id).update({
      active:true
    }).then( () => {
      commit('activateContest',id);
    }).catch((err)=>{
      console.error(err)
      payload.notify({
          title: 'Error',
          text: err,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
      })
    });
  },
  addContest({commit},payload){
    let data = payload.contest
    db.collection('contests').add(data).then((res)=>{
      data.id = res.id
      commit('addContest',data);
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
