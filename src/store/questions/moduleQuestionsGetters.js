/*=========================================================================================
  File Name: moduleContestGetters.js
==========================================================================================*/
const getters = {
    getQuestions:(state) => state.questions,
    getUploadProgress:(state) => state.uploadTask,
    getQuestion:(state) => (id) =>{
      
      console.log(state.questions.find((question)=>question.id == id))
      return state.questions.find((question)=>question.id == id)
    }

}

export default getters