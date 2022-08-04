<template>
  <div class="title">
<!--    <img src="../../assets/logo.png" style="width: 80px; height: 80px">-->
    <h2>{{ this.$store.state.selectProject.proName }}</h2>
  </div>
  <el-menu
      :default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      background-color="aliceblue"
      style="position: absolute; top: 60px; width: 100%; border-top: 1px dashed lightgray; z-index: 10"
  >
    <el-menu-item index="1">文档</el-menu-item>
    <el-menu-item index="2">原型</el-menu-item>
    <el-menu-item index="3" @click="this.$router.push({name: 'createGraph'})">UML</el-menu-item>
  </el-menu>
  <router-view></router-view>
</template>

<script>

export default {
  name: "TopTable",
}
</script>

<style scoped>
  .title {
    padding: 10px 20px 0;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    top: 0;
    background-color: aliceblue;
    width: 100%;
    z-index: 10;
  }
  .title h2 {
    padding: 10px 10px;
  }
</style>