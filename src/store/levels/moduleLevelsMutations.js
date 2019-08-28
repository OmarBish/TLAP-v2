/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const mutations = {
  addLevel(state,level){
    
    state.levels.push(level)
    state.levels = state.levels.sort((a,b)=>{
      return a.difficulty - b.difficulty
    })
  },
  setLevels(state,levels){
    state.levels = levels.sort((a,b)=>{
      return a.difficulty - b.difficulty
    })
    
  }
}

export default mutations
