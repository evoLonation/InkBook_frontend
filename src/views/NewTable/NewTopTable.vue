<template>
  <div class="top-layout">
    <div class="project-name" @click="this.$router.push({name: 'teamProject'})">
      <img class="project-pic" :src="'http://43.138.71.108/api/project/get-img?projectId='+ this.$store.state.selectProject.proId" alt="">
      <span class="project-my-name">{{ this.$store.state.selectProject.proName }}</span>
      <el-icon class="change-project"><Switch/></el-icon>
    </div>
    <el-menu
      mode="horizontal"
      class="my-el-menu"
    >
      <el-menu-item
          class="my-el-menu-item"
          index="1"
          @click="this.toDoc()"
      >
        文档
      </el-menu-item>
      <el-menu-item class="my-el-menu-item" index="2" @click="this.toProto()">原型</el-menu-item>
      <el-menu-item class="my-el-menu-item" index="3" @click="this.toUML()">UML</el-menu-item>
    </el-menu>
  </div>
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<script>
import {Switch} from "@element-plus/icons";
import store from'@/store'
export default {
  name: "NewTopTable",
  components: {Switch},
  data() {
    return{
      listType: '',
    }
  },
  mounted() {
    if (this.$route.params.type !== 'uml' && this.$route.params.type !== 'proto' ){
      this.listType = this.$store.state.list.listType
    }
    else{
      this.listType = this.$route.params.type
    }
    if (this.listType==='uml')
      this.$router.push({name: 'umlList'})
    else if (this.listType==='proto')
      this.$router.push({name: 'protoList'})
    else
      this.$router.push({name: 'DocumentList'})
  },
  methods:{
    toDoc(){
      this.$store.commit({type: 'list', listType: this.listType})
      console.log(this.$store.state.list.listType)
      this.$router.push({name: 'DocumentList'})
    },
    toProto(){
      this.$store.commit({type: 'list', listType: 'proto'})
      console.log(this.$store.state.list.listType)
      this.$router.push({name: 'protoList'})
    },
    toUML(){
      this.$store.commit({type: 'list', listType: 'uml'})
      console.log(this.$store.state.list.listType)
      this.$router.push({name: 'umlList'})
    }
  }
}
</script>

<style scoped>
.top-layout {
  width: 80%;
  height: 25%;
  margin: auto;
  padding: 40px;
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 0 16px 20px rgb(0 0 0 / 8%);
}

.project-name {
  width: 250px;
  height: 50px;
  float: right;
  margin-right: 5%;
  display: flex;
  background-color: #E2F5F7;
  border-radius: 20px;
  border: 1px dashed lightgrey;
  cursor: pointer;
}

.project-name:hover {
  box-shadow: 0 0 16px 5px rgb(0 0 0 / 8%);
}

.project-pic {
  width: 70px;
  height: 50px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: 1px dashed lightgray;
  /*border-radius: 40px;*/
  margin: auto 0 auto 0;
}

.project-my-name {
  height: 17px;
  font-size: 17px;
  font-weight: bold;
  margin: auto;
}

.change-project {
  height: 25px;
  font-size: 17px;
  font-weight: bold;
  margin: auto 8% auto auto;
}

.my-el-menu {
  top: 10%;
  width: 100%;
  float: bottom;
  border-bottom: 2px dashed lightgray;
}

.my-el-menu-item {
  font-size: 15px;
  font-weight: bold;
}

.main-container {
  width: 80%;
  height: 70vh;
  margin: 2% auto 0 auto;
  padding: 40px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 16px 20px rgb(0 0 0 / 8%);
}
</style>