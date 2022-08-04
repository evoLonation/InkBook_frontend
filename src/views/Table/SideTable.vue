<template >
  <div id="all" style="width: 100%;height: 100%;">

    <el-container>

<!--      <el-header class="Header" style="height: 50px; display: flex; justify-content: space-between; align-items: center;">-->

<!--        <img src="../assets/logo.png" style="width: 150px;margin-right: 30px; margin-left: 10px" @click="this.$router.push({name: 'login'})">-->
<!--        <el-input-->
<!--            v-model="userSearchContent"-->
<!--            placeholder="搜索用户..."-->
<!--            suffix-icon="Search"-->
<!--            style="width: 200px;margin-left: 30px;margin-right: auto; "-->
<!--            @input="this.$router.push({name: 'userSearch', params:{keyword: this.userSearchContent}})"-->
<!--        />-->
<!--        <div style="display: flex; justify-content: space-between; align-items: center; width: 80px">-->
<!--          <el-icon @click="this.$router.push({name:'message'})" ><Bell /></el-icon>-->
<!--          <el-avatar :src="url" style="width: 40px; height: 40px " @click="goInformation"/>-->
<!--        </div>-->
<!--      </el-header>-->

      <el-container>
        <el-aside class="Aside" style="width: auto;">
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-menu-item index="1" >
              <el-icon v-if="!isCollapse" @click="isCollapse=!isCollapse" style="float: right; "><DArrowLeft /></el-icon>
              <el-icon v-else @click="isCollapse=!isCollapse" style="float: right;"><DArrowRight /></el-icon>
            </el-menu-item>

            <el-menu-item class="abc" index="2" >
              <img src="../../assets/logo.png" style="width: 20px; margin-right: 10px"
                   @click="this.$router.push({name: 'UserInfo', params:{userId: this.userId}})">
              <template #title><span>我的昵称</span></template>
            </el-menu-item>

            <el-menu-item class="abc" index="3" >
              <el-icon><Folder /></el-icon>
              <template #title>
                <span v-if="this.$store.state.isSelectTeam === false"
                      @click="this.$router.push({name: 'teamProject'})">
                  全部项目
                </span>
                <span v-else
                      @click="this.$router.push({name: 'teamProject'})">
                  {{this.$store.state.selectTeam.teamName}}的项目
                </span>
              </template>
            </el-menu-item>

            <el-menu-item index="4" >
              <el-icon><Avatar /></el-icon>
              <template #title><span @click="this.$router.push({name: 'teamList', params: {key: ''}})">团队</span></template>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main style="padding: 0;margin-bottom: 0;height: 100vh">
          <div style="height: 100vh;margin-right: auto;margin-left: auto; background: #42b983;">
            <router-view></router-view>
<!--            <el-scrollbar style="height: 100%"></el-scrollbar>-->
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>

</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
Aside {

  background-color: white;

}

.Header {
  background-color: #C1D5E0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 40px;
}
a {
  text-decoration: none;
}
el-main {
  background-color: azure;
}
#all{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #FCFCFC;
  z-index: 1;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: auto;
  min-height: 400px;
}
.el-menu-vertical-demo {
  height: 100vh;
  align-items: center;

}
.el-menu-vertical-demo > * {
  padding-right: 20px;
  padding-left: 10px;
}
.el-menu-vertical-demo > *:nth-child(6) {
  padding-right: 0px;
  padding-left: 0px;
}
</style>


<script>
import {ElMessage} from "element-plus";
export default {
  name: 'Table',
  data() {
    return {
      type: 'recent',
      isCollapse: false,
      userId: '',
      url: '',
      userSearchContent: '',
      userSearchComp: false,
      projectVisible: false,
    }
  },
  components: {

  },
  // mounted() {
  //   this.$store.commit("changeTable", this.$route.params.info);
  // },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getAvatar: function (){
      // console.log('get avatar')
      // this.$axios.get("user/get-avatar", {
      //   params:{
      //     userId: this.userId,
      //   }
      // }).then((response)=>{
      //   if (response.status === 200){
      //     console.log(response.data)
      //     if (response.data.code === 0){
      //       this.url = response.data.url;
      //     }else console.log("用户头像获取错误");
      //   }else console.log("请求返回status不为200")
      // }).catch((err)=>{
      //   console.log(err);
      // });
    },
  },
  created(){
    this.userId = this.$store.state.loginUser.userId;
    console.log('created!')
    console.log(this.userId);

    this.getAvatar();
  }
}


</script>


