<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Demo</router-link> |
      <router-link to="/three">Three</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>

export default {
  data: function(){
    return {
      
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
        font-weight: 10;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

</style>
