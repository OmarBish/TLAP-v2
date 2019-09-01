/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const mutations = {
  setContests(state,contests){
    state.contests = contests
  },
  deleteContest(state,id){
    state.contests = state.contests.filter( (contest) => contest.id != id)
  },
  disableContest(state,id){
    state.contests.find((contest)=> contest.id == id ).active = false    
  },
  activateContest(state,id){
    state.contests.find((contest)=> contest.id == id ).active = true    
  },
  addContest(state,contest){
    state.contests.push(contest)
  },
  setUploadProgress(state,uploadTask){
    state.uploadTask = uploadTask
  }
}

export default mutations
