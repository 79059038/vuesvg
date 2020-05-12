<template>
  <div id="app">
    <div id="nav">
      <button @click="startAnimate">开始动画</button>
      <div class="buttonlist" @click="changeType">
        <button data-val="cycle">圆形</button>
        <button data-val="square">方形</button>
        <button data-val="triangle">三角形</button>
      </div>
      <div id='main' ref="main" @mousedown="newdom" style='background: url("https://ippt-storage-cdn-2.nobook.com/ppt-parse-storage/download/background/juniormiddleschool_09_i.jpg") center center / cover no-repeat; opacity: 1;'>
        <svg id="svg" width='960' height="720"></svg>
        <div class="back" ref="back">
          <div ref="backsquare"></div>
        </div>
        <div class="svglistdiv">
          <div class="wrapdiv" v-for="(item, index) in svglist" :key="item.id">
            <svg :id="'svg' + index"></svg>
          </div>
        </div>
      </div>
      
      
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <!-- <router-view/> -->
  </div>
</template>
<script>
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
export default {
  data: function(){
    return {
      bigCircle: undefined,//初始圆
      paper: undefined,//snapsvg初始对象
      type: undefined,//当前选择图形类型
      svglist: [],
      newdomSwitch: false,//新建图形开关
    }
  },
  mounted(){
    this.paper = Snap('#svg')
    let filter = this.paper.filter(Snap.filter.blur())
    this.bigCircle = this.paper.circle(55, 55, 50)
    this.bigCircle.attr({
        fill: "#bada55",
        stroke: "#000",
        strokeWidth: 5,
        filter
    })
    this.paper.text(200, 300, 100).attr({
      fill: '#aaa'
    })

  },
  methods: {
    startAnimate: function(){
      Snap.animate(55, 555, (val) => {
            this.bigCircle.attr({
              cx: 55 + val,
              cy: 55 + Math.pow(parseInt(val) - 55, 2) / 400
            })
      }, 20000)
    },
    changeType: function(event){
      this.type = event.target.getAttribute('data-val')
    },
    newdom: function(event){
      let disX = event.clientX
      let disY = event.clientY

      //跟随鼠标的方形
      this.$refs.back.style.zIndex = '1000'
      this.$refs.backsquare.setAttribute('style', `width:0;height:0;top:${this.disY}px;left:${this.disX}px`)

      document.onmousemove = this.onmouseupfun.bind(this, disX, disY)
      document.onmouseup = this.onmousedownfun.bind(this, disX, disY)
    },
    createSvg: function(){
      console.log(this.type)
    },
    onmouseupfun: function(disX, disY){
        this.newdomSwitch = true
        //比较当前点是否超出边界
        let fromatleft = Math.min(event.clientX, this.$refs.main.offsetLeft + this.$refs.main.clientWidth)
        fromatleft = Math.max(this.$refs.main.offsetLeft, fromatleft)
        let formattop = Math.min(event.clientY, this.$refs.main.offsetTop + this.$refs.main.clientHeight)
        formattop = Math.max(formattop, this.$refs.main.offsetTop)

        let left = Math.min( fromatleft, disX) - this.$refs.main.offsetLeft
        let top = Math.min(formattop, disY) - this.$refs.main.offsetTop

        let width = Math.abs(fromatleft - disX)
        let height = Math.abs(formattop - disY)
        this.$refs.backsquare.setAttribute('style', `width:${width}px;height:${height}px;left:${left}px;top:${top}px`)
    },
    onmousedownfun: function(disX, disY, e){
        this.$refs.back.setAttribute('style','z-index:-1')
        document.onmousemove = null
        this.newdomSwitch = false
        // let width = Math.abs(disX - e.clientX)
        // let height = Math.abs(disY - e.clientY)
        console.log(e)
        if(this.type){
          this.svglist.push({id: this.svglist.length})
          this.$nextTick(this.createSvg)
        }
        
        //清空事件
        document.onmouseup = null
        this.type = null
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.buttonlist {
  button {
    margin-right: 10px;
  }
}
#main {
  position: relative;
  width: 960px;
  height: 720px;
  margin: 0 auto;
  border: 1px solid #dddddd;
  #svg{
    position: absolute;
    left: 0;
    top: 0;
  }
  .svglistdiv{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .back{
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    div{
      background-color: rgba(174, 173, 173, 0.227);
      position: absolute;
    }
  }
}
</style>
