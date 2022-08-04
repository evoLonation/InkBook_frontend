<template>
  <div class="title">
    <img src="../../assets/logo.png" style="width: 80px; height: 80px">
    <h2>项目名称</h2>
  </div>
  <el-menu
      :default-active="1"
      class="el-menu-demo"
      mode="horizontal"
  >
    <el-menu-item index="1">文档</el-menu-item>
    <el-menu-item index="2">原型</el-menu-item>
    <el-menu-item index="3">UML</el-menu-item>
  </el-menu>
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
  }
  .title h2 {
    padding: 30px 10px;
  }
</style>