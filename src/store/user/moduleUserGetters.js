/*=========================================================================================
  File Name: moduleContestGetters.js
==========================================================================================*/
import firebase from 'firebase/app'
const getters = {
    getCurrentContest:(state) => state.current_contest,
    inContest:()=>{
        let currentContest = JSON.parse(localStorage.getItem('userInfo')).current_contest
        console.log('currentContest',currentContest)
        if(!currentContest) return false;
        let startTime = currentContest.start_time.seconds
        let duration = currentContest.duration
        let endtime = startTime + duration
        let currentTime = firebase.firestore.Timestamp.now().seconds
        console.log(endtime > currentTime)
        if( endtime > currentTime){
            return true
        }else{
          return false
        }
    }
}

export default getters