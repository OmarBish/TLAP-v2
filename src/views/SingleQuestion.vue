<template>
<div>
    <h1>{{questoin.name}}</h1>
    <div class="vx-col w-full sm:w-1/2 md:w-1/2 mb-base">
        <vx-card class="mt-2" title="Picture" collapse-action >
            <div class="text-center">
                <img :src="questoin.imgURL" alt="none" sizes="400" class="myImage mx-auto" id="myimage">
            </div>
        </vx-card>
    </div>

    <div class="vx-col w-full  mb-base">
        <vx-card class="mt-2" title="Draw" collapse-action >
                <iframe class="game" src="https://ieee-najah.github.io/apps/turtle/" width="95%" height="655" sandbox="allow-same-origin allow-scripts"></iframe>
        </vx-card>
    </div>
    
</div>
   

</template>

<script>
import VueFriendlyIframe from 'vue-friendly-iframe';


export default {
    data(){
        return{
            ctx:1,
            ypoints:[],
            xpoints:[],
            turtle:{
                src:"./turtle-apps/turtle/index.html"
            }
        }
    },
    computed:{
        questoin(){
            return this.$store.getters['questions/getQuestion'](this.$route.params.id)
        }
    },
    methods:{
        clear() { // clear canvas function
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        },
        mouseEnter(){
            console.log("enter")
            // magnify.show();

        },
        mouseLeave(){
            console.log("hi")
            // magnify.hide();

        },
        mouseup(e){
            let rect = this.$refs.canvas.getBoundingClientRect();
            let ctx = this.$refs.canvas.getContext('2d'); 
            ctx.clearRect(0,0,400,400);
            this.xpoints.push((e.clientX - rect.left));
            this.ypoints.push((e.clientY - rect.top));
            console.log(this.xpoints.length)
            switch(this.xpoints.length){
                case 3:
                    this.drawAngle(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1], this.xpoints[2], this.ypoints[2]);
                    this.drawLine(this.xpoints[1], this.ypoints[1], this.xpoints[2], this.ypoints[2]);
                    this.drawPoint(this.xpoints[2], this.ypoints[2]);
                case 2:
                    this.drawLine(this.xpoints[0], this.ypoints[0], this.xpoints[1], this.ypoints[1]);
                    this.drawPoint(this.xpoints[1], this.ypoints[1]);
                case 1:
                    this.drawPoint(this.xpoints[0], this.ypoints[0]);
                    break;
                default:
                    this.xpoints = [];
                    this.ypoints = [];

            }
        },
         drawLine(startX, startY, toX, toY){
            this.ctx.strokeStyle = '#00f';
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(toX,toY);
            this.ctx.stroke();
            this.ctx.fillStyle = '#00f';
            this.ctx.fillText(""+Math.floor(Math.sqrt(Math.pow(startX - toX, 2) + Math.pow(startY - toY,2))), (startX + toX)/2+5, (startY + toY)/2+5);
        },
        drawPoint(xp, yp){
            this.ctx.fillStyle = '#f00';
            this.ctx.beginPath();
            this.ctx.arc(xp, yp, 3, 0, 2*Math.PI);
            this.ctx.fill();
            this.ctx.fillText("("+Math.floor(xp-200)+","+Math.floor(-yp+200)+")", xp+5, yp-5);
        },
    
        drawAngle(x0, y0, x1, y1, x2, y2){
            var stangle = Math.atan2(x1-x0, y1-y0);
            var endangle = Math.atan2(x1-x2, y1 - y2);
            var angle = Math.floor((Math.abs(stangle - endangle)*180/Math.PI));
            angle = angle>180?360-angle:angle;
            this.ctx.fillStyle = '#f08';
            this.ctx.fillText(""+angle+"\xB0", x1+5, y1+10);
        },
        
        
    },

    mounted(){
        let canvas = this.$refs.canvas;
        this.ctx = canvas.getContext('2d'); 
        // magnify.add("myimage", 3);

    },
    created(){
        if(!this.$store.getters['questions/getQuestion'](this.$route.params.id))
            this.$store.dispatch('questions/fetchQuestion',this.$route.params.id)
    },
    components:{
        'vue-friendly-iframe': VueFriendlyIframe
    }

}
</script>

<style>

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
