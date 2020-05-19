<template>
    <div id="main">
        <el-button type="primary" @click="animation" round>开始动画</el-button>
        <div class="warpDiv">
            <svg width="256" height="112" viewBox="0 0 256 112">
                <path fill="none" stroke="#aaaaaa" d="M8,56 C8,33.90861 25.90861,16 48,16 C70.09139,16 88,33.90861 88,56 C88,78.09139 105.90861,92 128,92 C150.09139,92 160,72 160,56 C160,40 148,24 128,24 C108,24 96,40 96,56 C96,72 105.90861,92 128,92 C154,93 168,78 168,56 C168,33.90861 185.90861,16 208,16 C230.09139,16 248,33.90861 248,56 C248,78.09139 230.09139,96 208,96 L48,96 C25.90861,96 8,78.09139 8,56 Z"/>
            </svg>
            <div class="moveDiv"></div>
        </div>
        <div class="warpDiv">
            <div class="reverseDiv"></div>
        </div>
        <div class="warpNormalDiv">
            <div class="rotateDiv"></div>
        </div>
        <div class="warpNormalDiv">
            <div class="shutterDiv"></div>
        </div>
        <div class="warpNormalDiv">
            <div class="timeline"></div>
        </div>
        <div class="warpNormalDiv">
            <div class="timeline"></div>
        </div>
    </div>
</template>
<script>
import anime from 'animejs'
// import data from '../data/data.json'
export default {
    data(){
        return {
            anime,
        }
    },
    created(){
        this.$axios.get('../data/data.json')
            .then(res => {
                console.log(res)
                this.anime(res.data[0])
            })
    },
    mounted(){
        
    },
    methods: {
        animation(){
            const path = this.anime.path('path');
            const tl = this.anime.timeline({
                easing: 'easeOutExpo'
            })
            tl.add({
                targets: '.moveDiv',
                translateX: path('x'),
                translateY: path('y'),
                rotate: path('angle'),
                duration: '3000',
                loop: 'true',
                easing: 'linear'               
            }).add({
                targets: 'path',
                opacity: '0',
                duration: '6000',
                loop: 'true',
                direction: 'alternate',
                easing: 'easeInOutExpo'
            })
            // this.anime({
            //     targets: '.moveDiv',
            //     translateX: path('x'),
            //     translateY: path('y'),
            //     rotate: path('angle'),
            //     duration: 3000,
            //     loop: true,
            //     easing: 'linear'
            // })
            // this.anime({
            //     targets: 'path',
            //     opacity: 0,
            //     duration: 6000,
            //     loop: true,
            //     direction: 'alternate',
            //     easing: 'easeInOutExpo'
            // })
            // this.anime({
            //     targets: '.rotateDiv',
            //     translateX: 600,
            //     scale: 2,
            //     rotate: 360,
            //     easing: 'easeInOutSine',
            //     direction: 'alternate',
            //     loop: true
            // })
            this.anime({
                targets: '.shutterDiv',
                opacity: 0,
                translateX: [-10, 10],
                easing: 'easeInOutSine',
                duration: 100,
                loop: 4
            })
            this.anime({
                targets: '.timeline',
                translateX: 500,
                easing: 'easeInOutSine',
                duration: 1000,
                direction: 'alternate',
                loop: true,
                delay: function(el, i){
                    return i * 100
                }
            })
        }
    }

}
</script>
<style lang="scss" scoped>
#main {
    width: 100%;
    height: 600px;

    .warpDiv {
        position: relative;
        width: 256px;
        height: 112px;
        margin: 0 auto;
        padding: 5px;

        .moveDiv {
            width: 10px;
            height: 10px;
            background: #aaa;
            position: absolute;
            top: 2px;
            left: 2px;
        }

        .reverseDiv {
            width: 25px;
            height: 25px;
            background: #7ccf4b;
            top: 50%;
            left: 50%;
            position: absolute;
        }
    }

    .warpNormalDiv {
        position: relative;
        width: 556px;
        height: 112px;
        margin: 0 auto;
        padding: 5px;

        div {
            position: absolute;
        }

        .rotateDiv {
            width: 20px;
            height: 20px;
            background: #d44242;
        }

        .shutterDiv {
            width: 100px;
            height: 100px;
            background: #d686c2;
            left: 228px;
        }

        .timeline {
            width: 0;
            height: 0;
            border: 25px solid transparent;
            border-bottom-color: #e4425d;
        }
    }
}
</style>