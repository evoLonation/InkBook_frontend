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
      @click="this.$router.push({name: 'UserInfo', params: {userId: this.userId}})"
    >
      <div style="display: flex;">
        <img class="picture" :src="'http://43.138.71.108/api/user/get-avatar/?userId=' + this.$store.state.loginUser.userId" alt="" />
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
      @click="this.$router.push({name: 'teamList'})"
    >
      <div style="width: 50px;height: 50px">
        <img :src="'http://43.138.71.108/api/team/get-avatar/?teamId=' + this.$store.state.selectTeam.teamId" class="teamPic" alt="">
      </div>
      <div
        class="team-name"
      >
        <span style="max-width: fit-content">
          {{limitName}}
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
              style="padding-left: 15%"
              @click="this.$router.push({name:'teamProject'})"
          >
            <template #title>
              <el-icon><data-board /></el-icon>&nbsp;项目中心
            </template>
          </el-menu-item>
          <el-menu-item
              index="2"
              class="my-el-menu-item"
              style="padding-left: 15%;"
              @click="this.$router.push({name:'docCenter'})"
          >
            <template #title>
              <el-icon><list /></el-icon>&nbsp;文档中心
            </template>
          </el-menu-item>
          <el-menu-item
              index="3"
              class="my-el-menu-item"
              style="padding-left: 15%;"
              @click="this.$router.push({name: 'team', params: {teamId: 1}})"

          >
            <template #title>
              <el-icon><discount /></el-icon>&nbsp;团队管理
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
                index="4"
                @click="this.$router.push({name: 'projectRec'})"
            >
              <template #title>
                <el-icon><data-board /></el-icon>&nbsp;项目回收
              </template>
            </el-menu-item>
            <el-menu-item
                style="padding-left: 25%"
                index="5"
              class="my-el-menu-subItem"
                @click="this.$router.push({name: 'fileRec'})"
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
import {DataBoard, Delete, Discount, List, Switch} from "@element-plus/icons";
export default {
  name: "NewSideTable",
  components: {Discount, Switch, List, Delete, DataBoard},
  data(){
    return {
      userId: '',
      nickName: ''
    }
  },
  created() {
    this.userId = this.$store.state.loginUser.userId;
    this.nickName = this.$store.state.loginUser.nickname;
    this.$router.push({name:'teamProject'})
  },
  computed: {
    limitName() {
      if(this.$store.state.selectTeam.teamName.length <= 7){
        return this.$store.state.selectTeam.teamName;
      }
      else{
        let tmp = "";
        for(let i = 0; i < 7; i++){
          tmp += this.$store.state.selectTeam.teamName[i];
        }
        tmp += '…';
        return tmp;
      }
    }
  },
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
  margin: 10px auto 0 auto;
}

.my-main {
  width: 80%;
  min-height: 100vh;
}

.portrait {
  width: 80%;
  /*height: 22%;*/
  display: block;
  padding: 15px 50px 15px 50px;
  border-radius: 20px;
  background-color: #E2F5F7;
  margin: 10px auto 0 auto;
}

.portrait:hover{
  box-shadow: 0 16px 32px rgb(0 0 0 / 8%);
}

.my-team {
  width: 80%;
  /*height: 8%;*/
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
  padding-top: 5%;
  padding-bottom: 5%;
  font-size: 17px
}

.my-el-menu-item:hover{
  background-color: #E2F5F7;
}

.my-el-menu-subItem{
    padding-top: 2%;
    padding-bottom: 2%;
    font-size: 15px;
}

.my-el-aside >>>.el-sub-menu__title{
  padding-top: 5%;
  padding-bottom: 5%;
  font-size: 17px;
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
  margin: auto auto auto 10px;
}
</style>