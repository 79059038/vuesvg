<template>
  <div>
      <button @click="startAnimate">开始动画</button>
      <div class="buttonlist" @click="changeType">
        <button data-val="circle">圆形</button>
        <button data-val="square">方形</button>
        <button data-val="triangle">三角形</button>
      </div>
      <div id='main' ref="main" @mousedown="newdom" style='background: url("https://ippt-storage-cdn-2.nobook.com/ppt-parse-storage/download/background/juniormiddleschool_09_i.jpg") center center / cover no-repeat; opacity: 1;'>
        <svg id="svg" width='960' height="720"></svg>
        <div class="back" :style="backstyle" ref="back">
          <div ref="backsquare" :style="backSquareStyle"></div>
        </div>
        <div class="svgborderlistdiv">
          <div class="wrapdiv" v-for="(item, index) in svgborderlist" :key="item.id">
            <svg class="bordersvg" :id="'svgborder' + index"></svg>
          </div>
        </div>
        <div class="svglistdiv">
          <div class="wrapdiv" :style="svgDivListStyle[index]" v-for="(item, index) in svglist" :key="item.id">
            <svg :style="svgListStyle[index]" :id="'svg' + index"></svg>
          </div>
        </div>
        
      </div>
  </div>
</template>

<script>
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js'
export default {
  data() {
   return {
        bigCircle: undefined,//初始圆
        paper: undefined,//snapsvg初始对象
        type: undefined,//当前选择图形类型
        svglist: [],
        svgborderlist: [],
        newdomSwitch: false,//新建图形开关
        backstyle: {
            zIndex: -1
        },
        backSquareStyle: {
            width: 0,
            height: 0,
            top: 0,
            left: 0
        },
        svgDivListStyle: [],
        svgListStyle: [],
        aboutCircle:['circle']
   }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.paper = Snap('#svg')
    // let filter = this.paper.filter(Snap.filter.blur())
    this.bigCircle = this.paper.circle(55, 55, 50)
    // this.bigCircle.attr({
    //     fill: "#bada55",
    //     stroke: "#000",
    //     strokeWidth: 5,
    //     filter
    // })
  },
  methods: {
      /* 开始动画*/
    startAnimate: function(){
      Snap.animate(55, 555, (val) => {
            this.bigCircle.attr({
              cx: 55 + val,
              cy: 55 + Math.pow(parseInt(val) - 55, 2) / 400
            })
      }, 20000)
    },
    /*改变当前创建图形 */
    changeType: function(event){
      this.type = event.target.getAttribute('data-val')
    },
    /*鼠标点击事件 */
    newdom: function(event){
      let disX = event.pageX - this.$refs.main.offsetLeft
      let disY = event.pageY - this.$refs.main.offsetTop

      //跟随鼠标的方形
      this.backstyle.zIndex = '1000'
      this.backSquareStyle = Object.assign(this.backSquareStyle, {
        width:0,
        height:0,
        top: this.disY + 'px',
        left: this.disX + 'px'
      })
      //添加鼠标监听
      document.onmousemove = this.onmousemovefun.bind(this, disX, disY)
      document.onmouseup = this.onmouseupfun.bind(this, disX, disY)
    },
    /*创建图形 */
    createSvg: function({width, height, left, top}){//创建图形
      let svgObj = this.svglist[this.svglist.length-1]

      this.paper = svgObj.paper = Snap('#svg' + (this.svglist.length -1))
      let half = width / 2
      switch (this.type) {
        case 'circle':
          this.paper.circle(half, half, half).attr({fill: '#6999ca'})
          break
        case 'square':
          this.paper.rect(0, 0, width, height).attr({fill: '#6999ca'})
          break
        case 'triangle':
          this.paper.path(`M${half} 0L${width} ${height}L0 ${height}`).attr({fill: '#6999ca'})
          break
      }
      //图形分为类圆形与非类圆形。类圆形高度应为宽度值
      let realSytle = null
      if(this.aboutCircle.indexOf(this.type) != -1){
        realSytle = {left, top, width, height: width}
        this.createBorderSvg(realSytle)
      }else {
        realSytle = {left, top, width, height}
        this.createBorderSvg(realSytle)
      }
      //设置图形svg以及包含svgdiv的样式
      this.svgDivListStyle.push({
         width: width + 'px',
         height: realSytle.height + 'px',
         left: left + 'px',
         top: top + 'px'
      })
      this.svgListStyle.push({width: width + 'px', height: realSytle.height + 'px'})
      //清空当前所选图形
      this.type = null
    },
    /*创建图形周围边框 */
    createBorderSvg: function({left, top, height, width}){
      let svgObj = this.svgborderlist[this.svgborderlist.length -1]
      this.paper = svgObj.paper = Snap('#svgborder' + (this.svglist.length -1))
      //周围线路
      this.paper.path(
        `M${left} ${top}
        L${left + width} ${top}
        L${left + width} ${top+height}
        L${left} ${top+height}
        L${left} ${top}`
      ).attr({fill: 'none', stroke: '#6999ca'})
      this.paper.path(
        `M${left + width/2} ${top - 3}
        L${left + width/2} ${top - 19}`
      ).attr({fill: 'none', stroke: '#6999ca'})
      //9个点
      this.paper.rect(left-3, top-3, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})
      this.paper.rect(left + (width/2) -3, top -3, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})
      this.paper.rect(left + width -3, top - 3, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})
      this.paper.rect(left + width -3, top + (height/2) -3, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})
      this.paper.rect(left + width -3, top + height -3, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})
      this.paper.rect(left + (width/2) -3, top + height -3, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})
      this.paper.rect(left-3, top + height -3, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})
      this.paper.rect(left-3, top + (height/2) -3, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})

      this.paper.rect(left + (width/2) -3, top -25, 6, 6).attr({fill: 'none', stroke: '#aaaaaa'})
    },
    onmousemovefun: function(disX, disY, event){
        this.newdomSwitch = true
        //比较当前点是否超出边界
        let {left, top, width, height} = this.computeLocation(disX, disY, event)
        this.backSquareStyle = Object.assign(this.backSquareStyle, {
          width: width + 'px',
          height: height + 'px',
          left: left + 'px',
          top: top + 'px'
        })
    },
    onmouseupfun: function(disX, disY, event){
        this.backstyle.zIndex = -1
        document.onmousemove = null
        this.newdomSwitch = false

        let locationObj = this.computeLocation(disX, disY, event)

        if(this.type){
          this.svgborderlist.push({relaid: this.svglist.length, paper: null})
          this.svglist.push({id: this.svglist.length, paper: undefined})
          this.$nextTick(()=>this.createSvg(locationObj))
        }
        
        //清空事件
        document.onmouseup = null
    },
    /*计算图形位置 */
    computeLocation: function(disX, disY, event){
      let fromatleft = Math.min(event.pageX - this.$refs.main.offsetLeft,  + this.$refs.main.clientWidth)
      fromatleft = Math.max(0, fromatleft)
      let formattop = Math.min(event.pageY - this.$refs.main.offsetTop, this.$refs.main.clientHeight)
      formattop = Math.max(formattop, 0)

      let left = Math.min( fromatleft, disX)
      let top = Math.min(formattop, disY)
      let width = Math.abs(fromatleft - disX)
      let height = Math.abs(formattop - disY)

      return {
        left,
        top,
        width,
        height
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .wrapdiv {
      position: absolute;
    }
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
  .svgborderlistdiv{
    height: 0;
    .bordersvg{
      overflow: inherit;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>