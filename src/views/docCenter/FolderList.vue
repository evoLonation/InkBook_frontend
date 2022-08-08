<template>
  <div
    class="folder-layout"
  >
    <div
      style="display: flex"
    >
      <el-input
          v-model="search"
          class="folder-el-input"
          placeholder="输入文件夹名称"
      >
        <template #prefix>
          <el-icon>
            <search/>
          </el-icon>
        </template>
        <template #append>
          <el-button
            style="font-weight: bold"
          >
            搜索
          </el-button>
        </template>
      </el-input>
      <el-button
        class="folder-add-button"
      >
        <el-icon><plus/></el-icon>&nbsp;新建文件夹
      </el-button>
    </div>
    <div
      class="folder-guide"
    >
      <span
          class="folder-guide-words"
      >
        文件夹列表
      </span>
    </div>
    <el-scrollbar height="75vh">
      <el-row class="folder-collection">
        <div class="folder-info" v-for="o in 10" :key="o">
          <img class="folder-picture" src="../../assets/docCenter/文件夹使用.png" alt="">
          <span class="folder-name">临时文件夹</span>
        </div>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import {Plus, Search} from "@element-plus/icons";
export default {
  name: "FolderList",
  components: {Plus, Search},
  data(){
    return{
      search: ''
    }
  }
}
</script>

<style scoped>
.folder-layout {
  width: 100%;
  min-height: 100vh;
}

.folder-el-input {
  left: 15%;
  width: 40%;
  height: 50px;
  margin-top: 7%;
}

.folder-add-button {
  height: 50px;
  margin-top: 7%;
  margin-left: 30%;
  color: white;
  font-weight: bold;
  border-radius: 30px;
  background-color: royalblue;
}

.folder-guide {
  width: 100%;
  margin-top: 30px;
  height: 50px;
  display: flex;
  border-bottom: 4px dashed rgb(0 0 0 / 8%);
}

.folder-guide-words {
  height: 25px;
  font-size: 17px;
  font-weight: bold;
  margin: auto auto auto 3%;
}

.folder-collection {
  width: 100%;
  min-height: 50vh;
}

.folder-info {
  width: 10%;
  height: 30%;
  display: block;
  text-align: center;
  margin: 5% 0 0 8%;
}

.folder-info:hover {
  box-shadow: 0 16px 32px rgb(0 0 0 / 8%);
}

.folder-picture {
  width: 100%;
  height: 100%;
  margin-right: 0;
  cursor: pointer;
}

.folder-name {
  font-size: 15px;
}
</style>