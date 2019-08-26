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
        <div class="vx-row">
            <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base" v-for="contest in contests" :key="contest.id">
                <vx-card>
                    <div slot="no-body">
                        <img :src="require(`@/assets/images/pages/${contest.contentImg1}`)" alt="content-img" class="responsive card-img-top">
                    </div>
                    <h5 class="mb-2">{{ contest.title }}</h5>
                    <p class="text-grey">{{ contest.subtitle }}</p>
                    <p class="text-grey">{{ contest.subtitle_2 }}</p>
                    <div class="flex justify-between flex-wrap">
                        <vs-button v-if="contest.available" class="w-full mt-4 shadow-lg" type="gradient" color="#7367F0" gradient-color-secondary="#CE9FFC">Join Now</vs-button>
                        <vs-button disabled v-if="!contest.available" class="w-full mt-4" type="border" color="#b9b9b9">Not Available</vs-button>
                    </div>
                </vx-card>
            </div>
                        
        </div>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default{
    data() {
        return {
            // card 1
            contests:[ 
              {
                contentImg1: 'content-img-1.jpg',
                title: 'Vuesax Admin',
                subtitle: 'By Pixinvent Creative Studio',
                subtitle_2: 'Elite Author',
                available: true
              },
              {
                contentImg1: 'content-img-1.jpg',
                title: 'Vuesax Admin',
                subtitle: 'By Pixinvent Creative Studio',
                subtitle_2: 'Elite Author',
                available: false

              },
              {
                contentImg1: 'content-img-1.jpg',
                title: 'Vuesax Admin',
                subtitle: 'By Pixinvent Creative Studio',
                subtitle_2: 'Elite Author',
                available: false

              },
            ]
        }
    },
    components: {
        VuePerfectScrollbar,
        videoPlayer
    },
    mounted() {
        this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight;
    },
    created(){
      
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
}
</style>
