<template>
<div>
    <div class="search-page__search-bar flex items-center">
        <vs-input placeholder="Search" v-model="searchQuery" class="w-full input-rounded-full no-icon-border" icon="icon-search" icon-pack="feather" />
    </div>
    <div class="search-page__serch-menu flex flex-wrap items-center md:justify-between mt-8">
        <div class="flex flex-wrap">
            <span @click="selectedTag=tag" v-for="tag in tags" :key="tag" class="search-tab-filter" :class="tag == selectedTag ? 'text-white bg-primary':''" >{{tag}}</span>
        </div>
    </div>
    <Submission-Card></Submission-Card>
</div>
</template>

<script>
import SubmissionCard from "../components/custome/SubmissionCard"
export default {
    data() {
        return {
            searchQuery:'',
            tags:[
                'All',
                'Scored',
                'Not Scored'
            ],
            selectedTag:'All'
        }
    },
    computed:{
     
    },
    created(){
    },
    methods:{
        
    },
    components:{
        SubmissionCard
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/pages/search.scss";
</style>