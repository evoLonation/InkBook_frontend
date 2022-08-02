<template>
  <div id="app">
    <router-view></router-view>
  </div>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
</template>

<script>

export default {
  name: 'App',
  created() {
    this.$store.commit("init");
  }
}
</script>

<style>

</style>
