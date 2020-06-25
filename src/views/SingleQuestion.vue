<template>
<div>
    <!-- hidden content -->
    <vs-popup class="holamundo" title="Error" :active.sync="popupActive">
      <p> You must run the code in order to submit your question</p>
    </vs-popup>
    <!-------------------->
    <span class="text-center mb-1"><h1>{{questoin.name}}</h1> <p>score :- {{score.score}}</p> </span>
    <div class="vx-row">
        <div class="vx-col w-1/2 sm:w-1/2 md:w-1/2 mb-base">
            <vx-card class="mt-2" title="Picture" collapse-action >
                <div class="text-center">
                    <img :src="questoin.imgURL" alt="none" sizes="400" class="myImage mx-auto" id="myimage">
                    

                </div>
            </vx-card>
        </div>
        <div class="vx-col w-1/2 sm:w-1/2 md:w-1/2 mb-base">
            <vx-card class="mt-2" title="Your latest Submition" collapse-action >
                <div class="text-center" v-if="score.image">
                    <img :src="score.image" alt="none" sizes="400" class="myImage mx-auto" id="myimage">                    
                </div>
                <div class="text-center" v-if="!score.image">
                    <h1>
                        You haven't made any submission yet 
                    </h1>
                </div>
            </vx-card>
        </div>
    </div>
    

    <div class="vx-col w-full  mb-base">
        <vx-card class="mt-2" title="Draw" collapse-action >
                <iframe @load="setBlocks" class="game" ref="game" src="/game/apps/turtle/" width="95%" height="655" sandbox="allow-same-origin allow-scripts"></iframe>
        </vx-card>
    </div>
    <div class="text-center w-full">
    <vs-button @click="submitQuestion" size="large" class="mx-auto">Submit</vs-button>
    </div>

</div>
   

</template>

<script>

export default {
    data(){
        return{
            ctx:1,
            ypoints:[],
            xpoints:[],
            turtle:{
                src:"./turtle-apps/turtle/index.html"
            },
            popupActive:false
        }
    },
    computed:{
        questoin(){
            return this.$store.getters['questions/getQuestion'](this.$route.params.id)
        },
        score(){
                return this.$store.getters['questions/getScore'](this.$route.params.id)
        }
    },
    methods:{
        submitQuestion(){
            var Blockly  =this.$refs.game.contentWindow.Blockly;
            var Turtle  = this.$refs.game.contentWindow.Turtle;

            // Has to be runned
            if (!Turtle.executed) {
                this.popupActive =  true
                return ;
            }
            this.popupActive =  false
            
            var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
            var blocks = encodeURIComponent(xml.innerHTML);
            var image = this.$refs.game.contentDocument.getElementById('display').toDataURL('image/png',1.0);
            console.log('blocks' , blocks)
            console.log('image' , image)
            let data={
                question_id:this.$route.params.id,
                blocks: blocks,
                image: image,
                user_id: JSON.parse(localStorage.getItem('userInfo')).uid,
                score:0
            }
            let payload={
                score:data,
                notify:this.$vs.notify
            }
            this.$store.dispatch('questions/submitScore',payload);
        },
        setBlocks(){
            let blocks = decodeURIComponent(this.$store.getters['questions/getScore'](this.$route.params.id).blocks)
            console.log(blocks)
            let defaultXml = '<xml>' + blocks +'</xml>'
            let BlocklyApps =this.$refs.game.contentWindow.BlocklyApps
            BlocklyApps.loadBlocks(defaultXml);
        }
    },

    mounted(){
        console.log(this.score)
    },
    created(){
        //TODO Fetch Submission
        if(!this.$store.getters['questions/getQuestion'](this.$route.params.id))
            this.$store.dispatch('questions/fetchQuestion',this.$route.params.id)
    }

}
</script>

<style>
.big-text{
    font-size: 80px
}

.img-magnifier-container {
  position:relative;
}

.img-magnifier-glass {
  position: absolute;
  border: 3px solid #000;
  border-radius: 50%;
  cursor: crosshair;
  /*Set the size of the magnifier glass:*/
  width: 100px;
  height: 100px;
}
.myImage{
    max-width: 400px;
    max-width: 400px; 
}
.game{
    border:none;
}

</style>
