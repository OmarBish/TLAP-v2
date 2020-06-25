<template>
<div>
<vx-card title="Choose contest" class="carousel-example" >
    <div class="carousel-example">
        <swiper :options="swiperOption">
            <swiper-slide  v-for="contest in contests" :key="contest.id">
                <vx-card @contextmenu.prevent="$refs.menu.open">
                    <div slot="no-body">
                        <img :src="contest.imgURL" alt="content-img" class="responsive card-img-top">
                    </div>
                    <h5 class="mb-2 text-center">{{ contest.name }}</h5>
                    <div class="flex justify-between flex-wrap">
                        <vs-button @click="selectContest(contest)" class="w-full mt-4 " type="filled" :color="selectedContest.id == contest.id?'success':'primary'" >{{selectedContest.id == contest.id? 'Selected':'Select'}}</vs-button>
                    </div>
                </vx-card>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</vx-card>
<vx-card title="Choose question" class="carousel-example mt-5" v-if="selectedContest.id != null">
    <div v-if="levels.length != 0">
        <label>Select level</label>
        <vs-select @change="setQuestions" class="selectExample" v-model="selectedLevel" >
        <vs-select-item v-for="level in levels" :key="level.id" :value="level.id" :text="level.name"  />
        </vs-select>
    </div>
    <div class="text-center">
        <h1  v-if="levels.length == 0">There isn't any levels in this contest</h1>
    </div>
     <div class="carousel-example">
        <swiper :options="swiperOption">
            <swiper-slide  v-for="question in questions" :key="question.id">
                <vx-card @contextmenu.prevent="$refs.menu.open">
                    <div slot="no-body">
                        <img :src="question.imgURL" alt="content-img" class="responsive card-img-top">
                    </div>
                    <h5 class="mb-2 text-center">{{ question.name }}</h5>
                    <div class="flex justify-between flex-wrap">
                        <vs-button @click="$router.push({ name: 'SubmissionsReview', params: { id: tr.id }})" class="w-full mt-4 " type="filled"  >Select</vs-button>
                    </div>
                </vx-card>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>

</vx-card>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    data() {
        return {
            selectedLevel:'',
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    }
                }
            },
            selectedContest:{id:null}
        }
    },
    computed:{
      contests(){ return this.$store.getters['contest/contests'] },
      levels(){return this.$store.getters['levels/getLevels']},
      questions(){
            return this.$store.getters['questions/getQuestions']          
        }
    },
    created(){
      this.$store.dispatch('contest/fetchContests')
    },
    methods:{
        setQuestions(e){
            this.$store.dispatch('questions/fetchQuestions',e)
            this.questions();
        },
      selectContest(contest){
        this.selectedLevel='';
        if(contest.id == this.selectedContest.id) this.selectedContest.id = null
        else this.selectedContest.id = contest.id
        this.$store.dispatch('levels/fetchLevels',contest)
      }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style lang="scss">


</style>