<template>
  <antv/>
  <my-giao/>
</template>

<script>
import antv from './antv.vue'
import myGiao from "@/MyGiao";


export default {
  name: 'App',
  components: {
    antv,
    myGiao,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
