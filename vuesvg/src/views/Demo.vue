<template>
    <div id="main">
        <el-button type="primary" @click="animation" round>开始动画</el-button>
        <div class="moveDiv"></div>
    </div>
</template>
<script>
import anime from 'animejs'

export default {
    data(){
        return {
            anime
        }
    },
    mounted(){
        
    },
    methods: {
        animation(){
            this.anime({
                targets: '.moveDiv',
                translateX: 100,
                duration: 1000
            })
        }
    }

}
</script>
<style lang="scss" scoped>
#main{
    width: 100%;
    height: 600px;
    .moveDiv{
        width: 30px;
        height: 30px;
        background: #aaaaaa;
    }
}
</style>