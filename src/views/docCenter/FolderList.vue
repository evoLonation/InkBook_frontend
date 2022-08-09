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
        @click="visible=true"
      >
        <el-icon><plus/></el-icon>&nbsp;新建文件&nbsp;
      </el-button>
    </div>
    <div
      class="folder-guide"
    >
      <el-button
          class="folder-roll-back"
          :disabled="this.folderLayer.length === 1"
          @click="clickBack"
      >
        <el-icon>
          <arrow-left/>
        </el-icon>
      </el-button>
      <span v-if="!isMove"
          class="folder-guide-words"
      >
        {{this.folderLayer[this.folderLayer.length - 1].folderName}}
      </span>
      <span v-else
          class="folder-guide-words"
      >
        移动到...
      </span>
    </div>
    <el-scrollbar height="75vh">
      <el-row class="folder-collection" >
        <v-contextmenu ref="contextmenu">
          <v-contextmenu-item
              class="my-context-item"
              style="color: #409EFF;"
              @click="this.$refs.rename.open(this.currentId, this.currentType)"
          >
            <el-icon><edit/></el-icon>
            &nbsp;重命名
          </v-contextmenu-item>
          <v-contextmenu-item
              class="my-context-item"
              style="color: #F56C6C;"
              @click="clickDelete"
          >
            <el-icon><delete/></el-icon>
            &nbsp;删除
          </v-contextmenu-item>
          <v-contextmenu-item
              class="my-context-item"
              style="color: brown"
              @click="clickMove"
          >
            <el-icon><TopRight /></el-icon>
            &nbsp;{{this.folderLayer.length === 1 ? "移动" : "移到根目录"}}
          </v-contextmenu-item>
          <v-contextmenu-item
              class="my-context-item"
              style="color: black"
          >
            <el-icon><setting/></el-icon>
            &nbsp;属性
          </v-contextmenu-item>

        </v-contextmenu>
        <div class="folder-info" v-for="doc of this.docList" :key="doc" v-contextmenu:contextmenu @click="this.clickDoc(doc.docId)" @contextmenu.prevent="saveCurrent(doc.docId, 'doc')">
          <img class="folder-picture" src="../../assets/docCenter/文件试用.png"  alt="">
          <span class="folder-name" >{{doc.docName}}</span>
        </div>
        <div class="folder-info" v-for="folder of this.folderList" :key="folder" v-contextmenu:contextmenu @click="this.clickFolder(folder.folderId, folder.name)" @contextmenu.prevent="saveCurrent(folder.folderId, 'folder')">
          <img class="folder-picture" src="../../assets/docCenter/文件夹试用.png" alt="">
          <span class="folder-name" >{{folder.name}}</span>
        </div>
      </el-row>
    </el-scrollbar>
  </div>
  <CreateFile v-model="visible" @new-created="this.getListFiles" :parent-id="this.folderLayer[this.folderLayer.length - 1].folderId" type="team"/>
  <Rename v-model="renameVisible" ref="rename" @have-renamed="getListFiles"/>
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
    Setting,
    ArrowLeft,
    Delete,
    Plus, Search,
    [Contextmenu.name]: Contextmenu,
    [ContextmenuItem.name]: ContextmenuItem,
    CreateFile,
    Rename

  },
  directives: {
    contextmenu: directive,
  },
  data(){
    return{
      search: '',
      visible: false,
      renameVisible: false,
      folderLayer: [
        {
          folderId: 0,
          folderName: '根目录',
        },
      ],
      folderList: [],
      docList: [],
      teamId: this.$store.state.selectTeam.teamId,
      userId: this.$store.state.loginUser.userId,

      isMove : false,

      moverId : 0,

      currentId: 0,
      currentType: 'doc',
    }
  },
  methods: {
    check: function () {
      this.$message.success("success!");
    },
    getListFiles() {
      this.axios.get('file/list', {
        params: {
          "teamId": this.teamId,
          "parentId" : this.folderLayer[this.folderLayer.length - 1].folderId,
        }
      }).then((res) => {
        this.folderList = res.data.folderList;
        this.docList = res.data.docList;
      }).catch(err => {
        console.log(err)
        ElMessage({message: err.response.data.msg, type: 'warning'})
      })
    },
    clickDoc(docId) {
      this.$router.push({name: 'DocumentEdit', params:{docId: docId}})
    },
    clickFolder(folderId, folderName) {
      if(!this.isMove){
        this.folderLayer.push( {
          folderId: folderId,
          folderName: folderName,
        })
        this.getListFiles();
      }else{
        this.axios.post('folder/move', {
          docId : this.moverId,
          folderId: folderId,
        }).then(() => {
          ElMessage({message: '移动成功', type: 'success'});
          this.getListFiles();
          this.isMove = false;
        }).catch(err =>{
          console.log(err)
          ElMessage({message: err.response.data.msg, type: 'warning'})
        })
      }


    },
    clickDelete() {
      if(this.currentType === 'doc'){
        this.axios.post('document/delete', {
          docId : this.currentId,
          deleterId : this.userId,
        }).then(() => {
          ElMessage({message: '删除成功', type: 'success'});
          this.getListFiles()
        }).catch(err =>{
          console.log(err)
          ElMessage({message: err.response.data.msg, type: 'warning'})
        })
      }else {
        this.axios.post('folder/complete-delete', {
          folderId : this.currentId,
          deleterId : this.userId,
        }).then(() => {
          ElMessage({message: '删除成功', type: 'success'});
          this.getListFiles()
        }).catch(err =>{
          console.log(err)
          ElMessage({message: err.response.data.msg, type: 'warning'})
        })
      }
    },
    clickBack() {
      this.folderLayer.pop()
      this.getListFiles()
    },
    saveCurrent(id, type) {
      this.currentId = id;
      this.currentType = type;
    },
    clickMove() {
      this.moverId = this.currentId;
      if(this.folderLayer.length === 1){
        this.isMove = true;
      }else{
        this.axios.post('folder/move', {
          docId : this.moverId,
          folderId: 0,
        }).then(() => {
          ElMessage({message: '移动成功', type: 'success'});
          this.getListFiles();
          this.isMove = false;
        }).catch(err =>{
          console.log(err)
          ElMessage({message: err.response.data.msg, type: 'warning'})
        })
      }
    },
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