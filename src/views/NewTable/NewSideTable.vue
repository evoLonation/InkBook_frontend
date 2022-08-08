<template>
<div
  class="table-layout"
>
  <div
    class="my-side"
  >
    <div
      style="width: 100%; display: flex"
    >
      <img class="logo" src="../../assets/logo.png" alt=""/>
    </div>
    <div
      class="portrait"
    >
      <div style="display: flex">
        <img class="picture" src="../../assets/Team/人员.png" alt="" />
      </div>
      <div
        style="width: 100%; margin-top: 15px; text-align: center"
      >
        <span
           class="name"
        >
          {{userId}}
        </span>
      </div>
      <div
        style="width: 100%; margin-top: 10px; text-align: center"
      >
        <span>{{nickName}}</span>
      </div>
    </div>
    <div
      class="my-team"
    >
      <div>
        <img src="../../assets/Team/测试头像.jpg" class="teamPic" alt="">
      </div>
      <div
        class="team-name"
      >
        <span>
          我们的团队
        </span>
      </div>
      <el-icon style="margin: auto"><Switch/></el-icon>
    </div>
    <div
      class="my-el-aside"
    >
      <el-aside
          width="100%"
          style="margin-top: 20px;"
      >
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item
              index="1"
              class="my-el-menu-item"
              style="padding-left: 20%"
          >
            <template #title>
              <el-icon><data-board /></el-icon>&nbsp;项目中心
            </template>
          </el-menu-item>
          <el-menu-item
              index="2"
              class="my-el-menu-item"
              style="padding-left: 20%;"
          >
            <template #title>
              <el-icon><list /></el-icon>&nbsp;文档中心
            </template>
          </el-menu-item>
          <el-sub-menu
          >
            <template #title>
              <el-icon><delete /></el-icon>&nbsp;回收管理
            </template>
            <el-menu-item
                style="padding-left: 25%"
              class="my-el-menu-subItem"
            >
              <template #title>
                <el-icon><data-board /></el-icon>&nbsp;项目回收
              </template>
            </el-menu-item>
            <el-menu-item
                style="padding-left: 25%"
              class="my-el-menu-subItem"
            >
              <template #title>
                <el-icon><list /></el-icon>&nbsp;文档回收
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
    </div>
  </div>
  <div
    class="my-main"
  >
    <router-view/>
  </div>
</div>
</template>

<script>
import {DataBoard, Delete, List, Switch} from "@element-plus/icons";
export default {
  name: "NewSideTable",
  components: {Switch, List, Delete, DataBoard},
  data(){
    return {
      userId: '',
      nickName: ''
    }
  },
  created() {
    this.userId = this.$store.state.loginUser.userId;
    this.nickName = this.$store.state.loginUser.nickname;
  }
}
</script>

<style scoped>
.table-layout {
  width: 100%;
  display: flex;
  min-height: 100vh;
  background-color: #E2F5F7;
  font-family: "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

.my-side {
  width: 20%;
  min-height: 100vh;
  background-color: white;
}

.logo {
  width: 120px;
  margin: 30px auto 0 auto;
}

.my-main {
  width: 80%;
  min-height: 100vh;
}

.portrait {
  width: 70%;
  height: 25%;
  display: block;
  padding: 30px;
  border-radius: 20px;
  background-color: #E2F5F7;
  margin: 30px auto 0 auto;
}

.portrait:hover{
  box-shadow: 0 16px 32px rgb(0 0 0 / 8%);
}

.my-team {
  width: 70%;
  height: 8%;
  display: flex;
  padding: 15px;
  border-radius: 20px;
  vertical-align: center;
  background-color: #E2F5F7;
  margin: 25px auto 0 auto;
  cursor: pointer;
}

.my-team:hover{
  box-shadow: 0 10px 32px rgb(0 0 0 / 8%);
}

.picture {
  width: 45%;
  height: 45%;
  border-radius: 40px;
  background-color: white;
  margin: 10px auto 0 auto;
}

.picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  width: 100%;
  height: 30px;
  font-size: 20px;
  line-height: 25px;
  font-weight: bold;
}

.my-el-menu-item {
  padding-top: 10%;
  padding-bottom: 10%;
  font-size: 20px
}

.my-el-menu-item:hover{
  background-color: #E2F5F7;
}

.my-el-menu-subItem{
    padding-top: 7%;
    padding-bottom: 7%;
    font-size: 17px;
}

.my-el-aside >>>.el-sub-menu__title{
  padding-top: 10%;
  padding-bottom: 10%;
  font-size: 20px;
}

.my-el-aside >>>.el-sub-menu__title:hover{
  background-color: #E2F5F7;
}

.my-el-aside >>>.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu__title{
  padding-left: 20%;
}

.teamPic {
  width: 100%;
  height: 100%;
  margin-left: 5%;
  border-radius: 40px;
  background-color: white;
}

.teamPic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.team-name {
  width: 60%;
  height: 20px;
  font-size: 15px;
  font-weight: bold;
  margin: auto auto auto 12%;
}
</style>