<template>
<div>
  <add-new-level-sidebar :isSidebarActive="addNewLevelSidebar" @closeSidebar="addNewLevelSidebar = false" />
  <div class="mt-5" v-if="contestEnded">
    <div class="add-new-level">
      <h1 class="mb-5 mr-2 text-center">
        {{currentContestName}}
      </h1> 
      <vx-tooltip text="Add new level">
        <vs-button @click="addNewLevelSidebar = true" class="cursor-pointer" radius icon="icon-plus" icon-pack="feather"></vs-button>
      </vx-tooltip>
    </div>
    <div v-if="levels.length == 0">
      <h3 class="text-center">
        There isn't any level added to this contest
      </h3>
    </div>
    <vs-tabs alignment="fixed" v-if="levels.length > 0">
      <vs-tab v-for="(level,levelIndex) in levels" :key="levelIndex" :data="level" :label="level.name">
        <div>
          <questions></questions>
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
  <div v-if="!contestEnded">
    <h1 class="text-center">
      You haven't particepated in any contest
    </h1>
  </div>
</div>
  
</template>

<script>
import Questions from "../components/custome/QuestionsView.vue"
import firebase from 'firebase/app'
import 'firebase/firestore'

import AddNewLevelSidebar from '../components/custome/forms/AddNewLevelSidebar';

export default {
  data(){
    return {
      addNewLevelSidebar:false
    }
  },
  computed:{
    levels(){
      return this.$store.getters['levels/getLevels']
    },
    currentContestName(){
      return JSON.parse(localStorage.getItem('userInfo')).current_contest.name
    },
    contestEnded(){
      let currentContest = JSON.parse(localStorage.getItem('userInfo')).current_contest
      let startTime = currentContest.start_time.seconds
      console.log('startTime',startTime)
      let duration = currentContest.duration
      console.log('duration',duration)
      let endtime = startTime + duration
      console.log('endtime',endtime)
      let currentTime = firebase.firestore.Timestamp.now().seconds
      console.log('currentTime',currentTime)
      console.log('endtime < currentTime',endtime < currentTime)
      if( endtime > currentTime){
          return true
      }else{
        return false
      }
    }
  },
  created(){
      this.$store.dispatch('levels/fetchLevels')
  },
	components:{
    Questions,
    AddNewLevelSidebar
	}
}
</script>
<style >
.add-button{
  position: fixed;
  bottom: 10px;
  right:10px;
  z-index: 9999;
}
.add-new-level{
  display: flex;
  justify-content: center;
}
</style>
