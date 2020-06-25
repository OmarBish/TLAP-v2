<template>
<div>
    <vx-card title="Name" class="text-center" collapse-action >
        <div class="flex justify-between mb-3">
            <div>
                Original
                <img src="https://dummyimage.com/400/000000/ffffff" alt="">
            </div>
            <div>
                Submission
                <img src="https://dummyimage.com/400/000000/ffffff" alt="">
            </div>
        </div>
        <div class="flex justify-around mb-3">
            <div>
                <p>Current Score</p>
                <h1>{score}</h1>
            </div>
            <div>
                <vs-button color="primary" type="border">See Code</vs-button>
            </div>
        </div>
        <h3>Score</h3>
        <vs-slider color="success" text-fixed=% v-model="score"/>
        <vs-button color="primary" type="filled">Submit</vs-button>

    </vx-card>
</div>
</template>

<script>

export default {
    data() {
        return {
            score:50,
        }
    },
    computed:{
     
    },
    created(){
    },
    methods:{
        
    }
}
</script>

<style lang="scss">


</style>