/*=========================================================================================
  File Name: moduleContestGetters.js
==========================================================================================*/
const getters = {
    getCurrentContest:(state) => state.current_contest,
    getScore:(state) => {
        return state.solvedQestions
    }
    
}

export default getters