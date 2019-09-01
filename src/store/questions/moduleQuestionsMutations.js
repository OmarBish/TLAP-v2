/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const mutations = {
  setQuestions(state,questions){
    state.questions = questions
  },
  addQuestion(state,question){
    state.questions.push(question)
  },
  setUploadProgress(state,uploadTask){
    state.uploadTask = uploadTask
  }

}

export default mutations
