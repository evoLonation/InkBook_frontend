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
          placeholder="输入文件名称"
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
        <el-icon><plus/></el-icon>&nbsp;新建文件&nbsp;
      </el-button>
    </div>
    <div
      class="folder-guide"
    >
      <!--如果所在是根目录，请使用这个-->
<!--      <el-button-->
<!--          class="folder-roll-back"-->
<!--          disabled-->
<!--      >-->
<!--        <el-icon>-->
<!--          <arrow-left/>-->
<!--        </el-icon>-->
<!--      </el-button>-->
      <el-button
          class="folder-roll-back"
      >
        <el-icon>
          <arrow-left/>
        </el-icon>
      </el-button>
      <span
          class="folder-guide-words"
      >
        文件列表
      </span>
    </div>
    <el-scrollbar height="75vh">
      <el-row class="folder-collection" >
        <v-contextmenu ref="contextmenu">
          <v-contextmenu-item
              class="my-context-item"
          >
            <el-icon><delete/></el-icon>
            &nbsp;删除文件
          </v-contextmenu-item>
        </v-contextmenu>
        <div class="folder-info" v-for="o in 10" :key="o" v-contextmenu:contextmenu>
          <!--如果是文件，请使用：-->
          <img class="folder-picture" src="../../assets/docCenter/文件试用.png" v-if="o % 2 === 1" alt="">
          <img class="folder-picture" src="../../assets/docCenter/文件夹试用.png" v-else alt="">
          <span class="folder-name" >临时文件</span>
        </div>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import {ArrowLeft, Delete, Plus, Search} from "@element-plus/icons";
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";

export default {
  name: "FolderList",
  components: {
    ArrowLeft,
    Delete,
    Plus, Search,
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
  },
  directives: {
    contextmenu: directive,
  },
  data(){
    return{
      search: ''
    }
  },
  methods: {
    check: function () {
      this.$message.success("success!");
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
  margin: auto auto auto 1%;
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
  opacity: 40%;
  cursor: pointer;
}

.folder-name {
  font-size: 15px;
}

.my-context-item {
  color: #F56C6C;
}

.my-context-item:hover {
  background-color: rgb(0 0 0 / 8%);
}

.folder-roll-back {
  border: none;
  height: 100%;
  margin-left: 2%;
  color: black;
  font-weight: bold;
  background-color: #E2F5F7;
}

.folder-roll-back:hover{
  background-color: #E2F5F7;
}
</style>