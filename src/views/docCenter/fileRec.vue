<template>
  <div
    class="folder-layout"
  >
    <div style="height: 40px"></div>
    <div
      class="folder-guide"
    >
      <el-button
          class="folder-roll-back"
      >
        <el-icon size="large"><DeleteFilled /></el-icon>
      </el-button>
      <span
          class="folder-guide-words"
      >
        文档回收站
      </span>
    </div>
    <el-scrollbar height="75vh">
      <el-row class="folder-collection" >
        <v-contextmenu ref="contextmenu">
          <v-contextmenu-item
              class="my-context-item"
              style="color: green;"
              @click="clickRecover"
          >
            <el-icon><edit/></el-icon>
            &nbsp;恢复
          </v-contextmenu-item>
          <v-contextmenu-item
              class="my-context-item"
              style="color: #F56C6C;"
              @click="clickDelete"
          >
            <el-icon><delete/></el-icon>
            &nbsp;彻底删除
          </v-contextmenu-item>

        </v-contextmenu>
        <div class="folder-info" v-for="doc of this.docList" :key="doc" v-contextmenu:contextmenu @contextmenu.prevent="currentId = doc.docId">
          <img class="folder-picture" src="../../assets/docCenter/文件试用.png"  alt="">
          <span class="folder-name" >{{doc.docName}}</span>
        </div>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import {ArrowLeft, Delete, Plus, Search, Setting} from "@element-plus/icons";
import { directive, Contextmenu, ContextmenuItem } from "v-contextmenu";
import CreateFile from "@/components/dialog/CreateFile";
import "v-contextmenu/dist/themes/default.css";
import {ElMessage} from "element-plus";
import Rename from "@/components/dialog/Rename";

export default {
  name: "FolderList",
  components: {
    Delete,
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,

  },
  directives: {
    contextmenu: directive,
  },
  data(){
    return{
      docList: [],
      teamId: this.$store.state.selectTeam.teamId,
      userId: this.$store.state.loginUser.userId,


      currentId: 0,
    }
  },
  methods: {
    check: function () {
      this.$message.success("success!");
    },
    getListFiles() {
      this.axios.get('document/recycle', {
        params: {
          "teamId": this.teamId,
        }
      }).then((res) => {
        this.docList = res.data.docList;
      }).catch(err => {
        console.log(err)
        ElMessage({message: err.response.data.msg, type: 'warning'})
      })
    },
    clickRecover() {
      this.axios.post('document/recover', {
        docId: this.currentId,
      }).then((res) => {
        ElMessage({message: '恢复成功', type: 'success'});
        this.getListFiles()
      }).catch(err => {
        console.log(err)
        ElMessage({message: err.response.data.msg, type: 'warning'})
      })
    },
    clickDelete() {
        this.axios.post('document/complete-delete', {
          docId : this.currentId,
        }).then(() => {
          ElMessage({message: '彻底删除成功', type: 'success'});
          this.getListFiles()
        }).catch(err =>{
          console.log(err)
          ElMessage({message: err.response.data.msg, type: 'warning'})
        })
    }
  },
  created() {
    this.getListFiles();
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
  margin-bottom: 2px;
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