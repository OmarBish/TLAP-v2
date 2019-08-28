/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const mutations = {
  updateCurrentContest(state,current_contest){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    userInfo.current_contest = current_contest
    localStorage.setItem('userInfo',JSON.stringify(userInfo))
    state.current_contest = current_contest
  }
}

export default mutations
