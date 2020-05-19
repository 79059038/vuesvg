<template>
  <div id="main">

  </div>
</template>

<script>
import * as Three from 'three'
export default {
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            mesh: null
        }
    },
    created() {

    },
    mounted() {
        this.init();
        this.animate()
    },
    methods: {
        init: function(){
            const container = document.getElementById('main')

            this.scene = new Three.Scene();
            this.camera = new Three.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.1, 1000);
            this.renderer = new Three.WebGLRenderer();
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);         
    
            let geometry = new Three.BoxGeometry(1, 1, 1);
            let material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
            this.mesh = new Three.Mesh(geometry, material);
            this.scene.add(this.mesh);       
        },
        animate: function() {
            requestAnimationFrame(this.animate);
            this.mesh.rotation.x += 0.01;
            this.mesh.rotation.y += 0.02;
            this.renderer.render(this.scene, this.camera);
        }
    }
}
</script>
<style lang="scss" scoped>
#main {
    position: relative;
    height: 600px;
    width: 950px;
    margin: 0 auto;
}
</style>