<script>
export default {
    props :['dataList','answerStatus','isSubmit'],
    data(){
        return {
            time:3
        }
    },
    methods:{
        addZero(num){
            return num<10?'0'+num:num
        },
        timeTobefore(time){
            let h = this.addZero(Math.floor(time/60/60))
            let m = this.addZero(Math.floor(time/60%60))
            let s = this.addZero(Math.floor(time%60))
            return h+':'+m+':'+s
        }
    },
    mounted(){
        if(this.time>0){
            this.timer = setInterval(()=>{
                this.time--
            },1000)
        }else if(this.time<=0){
            clearInterval(this.timer)
            this.$emit('submit')
        }
    }

}
</script>

<template>
<div class="box">
    <header><span class="card">答题卡</span><span class="time">{{ timeTobefore(time) }}</span></header>
    <main>
        <div class="btns">
            <div class="btn-item" v-for="(item,index) in dataList" :key="index"
            :class="{'active':answerStatus[index]}"
            >
                {{ index+1 }}
            </div>
        </div>
    </main>
</div>
</template>


<style lang="scss" scoped>
.box{
    position: fixed;
    top: 10px;
    right: 10%;
    width: 200px;
    min-height: 300px;
    header{
        display: flex;
        align-items: center;
        span{
            flex: 1;
            height: 30px;
            text-align: center;
            line-height: 30px;
        }
        .card{
            background-color: #5992E5;
            color: #fff;
        }
        .time{
            color: red;
        }
    }
    main{
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        min-height: 260px;
        background-color: rgba($color: #000000, $alpha: .5);
        .btns{
            display: flex;
            flex-wrap: wrap;
            .btn-item{
                width: 25px;
                height: 25px;
                margin: 4px;
                background-color: #fff;
                text-align: center;
                line-height: 25px;
                cursor: pointer;
                &:hover{
                    background-color: #5992E5;
                    color: #fff;
                }
                &.active{
                    background: red;
                    color: #fff;
                }
            }
        }
    }
}
</style>