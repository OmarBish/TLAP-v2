<!-- =========================================================================================
    File Name: CardBasic.vue
    Description: Basic Cards
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="demo-basic-card">
    <add-new-contest-sidebar :isSidebarActive="addNewSidebar" @closeSidebar="addNewSidebar = false" />

        <div class="vx-row">
          <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base" v-for="contest in contests" :key="contest.id">
              <vx-card @contextmenu.prevent="$refs.menu.open">
                  <div slot="no-body">
                      <img :src="contest.imgURL" alt="content-img" class="responsive card-img-top">
                  </div>
                  <h5 class="mb-2">{{ contest.name }}</h5>
                  <p class="text-grey">{{ contest.description }}</p>
                  <div class="flex justify-between flex-wrap">
                      <vs-button @click="joinContest(contest)" v-if="contest.active && !inContest" class="w-full mt-4 shadow-lg" type="gradient" color="#7367F0" gradient-color-secondary="#CE9FFC">Join Now</vs-button>
                      <vs-button 
                      disabled @click="joinContest(contest)" 
                      v-if="inContest" 
                      class="w-full mt-4 shadow-lg" 
                      type="gradient" 
                      color="#7367F0" 
                      gradient-color-secondary="#CE9FFC">You already Joined a contest</vs-button>
                      <vs-button disabled v-if="!contest.active && !inContest " class="w-full mt-4" type="border" color="#b9b9b9">Not Available</vs-button>
                  </div>

                  <!-- contest actions -->
                  <vs-dropdown class="ml-auto md:block hidden cursor-pointer pos-tr" vs-trigger-click>
                      <vs-button radius icon="icon-settings" icon-pack="feather"></vs-button>

                      <vs-dropdown-menu class="w-32">
                          <vs-dropdown-item>
                            <div @click="deleteContest(contest.id)" class="flex items-center text-danger">
                              <feather-icon icon="TrashIcon" class="inline-block mr-2 " svgClasses="w-4 h-4" />
                              <span>Delete</span>
                            </div>
                          </vs-dropdown-item>
                          <vs-dropdown-item v-if="!contest.active">
                            <div @click="activateContest(contest.id)" class="flex items-center text-success">
                              <feather-icon icon="PowerIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                              <span>Activate</span>
                            </div>
                          </vs-dropdown-item>
                          <vs-dropdown-item v-if="contest.active">
                            <div @click="disableContest(contest.id)" class="flex items-center">
                              <feather-icon icon="PowerIcon" class="inline-block mr-2" svgClasses="w-4 h-4" />
                              <span>Disable</span>
                            </div>
                          </vs-dropdown-item>
                      </vs-dropdown-menu>
                  </vs-dropdown>
              </vx-card>
          </div>

          <!-- No Contents -->
          <div class="vx-col w-full mb-base" v-if="contests.length == 0" >
            <h1 class="text-center warning">There isn't any contest</h1>
          </div>
        </div>

        <!-- Add new button  -->
        <vs-button @click="addNewSidebar = true" class="ml-auto md:block cursor-pointer" radius icon="icon-plus" icon-pack="feather"></vs-button>
      </div>
</template>

<script>
import AddNewContestSidebar from '../components/custome/forms/AddNewContestSidebar';

export default{
    data(){
      return {
        addNewSidebar : false
      }
    },
    components:{
      AddNewContestSidebar
    },
    created(){
      this.$store.dispatch('contest/fetchContests')
    },
    computed:{
      contests(){ return this.$store.getters['contest/contests'] },
      inContest(){
        return this.$store.getters['user/inContest']
      }
      // contests(){ return [] }
    },
    methods:{
      joinContest(contest){
        let payload = {
          id:contest.id,
          duration:contest.duration,
          name:contest.name
        }
        this.$store.dispatch('user/joinContest',payload)
      },
      deleteContest(id){
        let payload = {
          id : id,
          notify : this.$vs.notify
        }
        this.$store.dispatch('contest/deleteContest',payload)
        
      },
      activateContest(id){
        let payload = {
          id : id,
          notify : this.$vs.notify
        }
        this.$store.dispatch('contest/activateContest',payload)
      },
      disableContest(id){
        let payload = {
          id : id,
          notify : this.$vs.notify
        }
        this.$store.dispatch('contest/disableContest',payload)

      }
    }
}
</script>

<style lang="scss">
#demo-basic-card {
    .overlay-card {
        .vx-card__collapsible-content {
            max-height: 485px;
        }
    }

    .chat-card-log {
        height: 360px;

        .chat-sent-msg {
            background-color: #f2f4f7 !important;
        }
    }

    .card-video {
        .video-js {
            height: 370px;
        }
    }
    .pos-tr{
      position: absolute;
      top:10px;
      right:10px;
    }
}
</style>
