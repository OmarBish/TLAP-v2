<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
<div> 
   <div class="vx-row " id="dashboard-analytics">

    <!-- CARD 1: CONGRATS -->
    <div class="vx-col w-full lg:w-1/2 mb-base">
      <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user welcome-card verven">
       
        
        <div class="">
            <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
            <!-- TODO set name dynamically -->
            <h1 class="mb-6 text-white align-middle">Welcome to TLAP </h1>
            <h1>{{user_displayName}}</h1>
        </div>
        
        <!-- <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.</p> -->
      </vx-card>
    </div>

    <div class="vx-col w-full lg:w-1/2 mb-base">
      <scoreboard></scoreboard>
    </div>
  </div>

  <div class="vx-row">
    <div class="vx-col w-full mb-base">
          <creative-Carsoul></creative-Carsoul>
    </div>

  </div>

  
</div>


  
</template>

<script>

import Scoreboard from '../components/custome/Scoreboard.vue'
import creativeCarsoul from '../components/custome/CreativeCarsoul.vue'


export default {
    components:{
      Scoreboard,
      creativeCarsoul
    },
    data() {
        return {
            isImp: false,
            navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
            show: false,
            items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            nextNum: 10,
            'tableList': [
                'vs-th: Component',
                'vs-tr: Component',
                'vs-td: Component',
                'thread: Slot',
                'tbody: Slot',
                'header: Slot'
            ],
            users: [{
                    "orderNo": 879985,
                    "status": "Moving",
                    "statusColor": "success",
                    "operator": "Cinar Knowles",
                    "operatorImg": "avatar-s-2.png",
                    usersLiked: [
                        { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
                        { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
                        { name: 'Darcey Nooner', img: 'avatar-s-8.png' }
                    ],
                    "location": "Anniston, Alabama",
                    "distance": "130 km",
                    "distPercent": 80,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 156897,
                    "status": "Pending",
                    "statusColor": "warning",
                    "operator": "Britany Ryder",
                    "operatorImg": "avatar-s-4.png",
                    usersLiked: [
                        { name: 'Trina Lynes', img: 'avatar-s-1.png' },
                        { name: 'Lilian Nenez', img: 'avatar-s-2.png' },
                        { name: 'Alberto Glotzbach', img: 'avatar-s-3.png' }
                    ],
                    "location": "Cordova, Alaska",
                    "distance": "234 km",
                    "distPercent": 60,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 568975,
                    "status": "Moving",
                    "statusColor": "success",
                    "operator": "Kishan Ashton",
                    "operatorImg": "avatar-s-1.png",
                    usersLiked: [
                        { name: 'Lai Lewandowski', img: 'avatar-s-6.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' },
                        { name: 'Darcey Nooner', img: 'avatar-s-8.png' },
                        { name: 'Julee Rossignol', img: 'avatar-s-10.png' },
                        { name: 'Jeffrey Gerondale', img: 'avatar-s-9.png' },
                    ],
                    "location": "Florence, Alabama",
                    "distance": "168 km",
                    "distPercent": 70,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                },
                {
                    "orderNo": 245689,
                    "status": "Canceled",
                    "statusColor": "danger",
                    "operator": "Anabella Elliott",
                    "operatorImg": "avatar-s-6.png",
                    usersLiked: [
                        { name: 'Vennie Mostowy', img: 'avatar-s-5.png' },
                        { name: 'Elicia Rieske', img: 'avatar-s-7.png' }
                    ],
                    "location": "Clifton, Arizona",
                    "distance": "125 km",
                    "distPercent": 95,
                    "startDate": "14:58 26/07/2018",
                    "estDelDate": "28/07/2018"
                }

            ]
        }
    },
    computed:{
      user_displayName(){
        return JSON.parse(localStorage.getItem('userInfo')).displayName
      }
    }
   

}
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user{
    position: relative;
    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}


.carousel-example .swiper-container .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 300px;
}

.welcome-card{
  height: 100%;
}
.verven{
  display:flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

</style>

