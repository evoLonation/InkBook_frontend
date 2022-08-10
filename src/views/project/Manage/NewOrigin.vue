<template>
  <div>
    <el-button
        style="height: 40px;
          margin-left: 95%;
          color: white;
          font-weight: bold;
          border-radius: 30px;
          background-color: royalblue;" round
        @click="dialogVisible = true">
      <el-icon>
        <Plus/>
      </el-icon>
    </el-button>
  </div>
  <el-scrollbar>
    <el-row>
      <el-col
          style="margin-top: 20px"
          :span="6"
          v-for="graph in graphList"
          :key="graph"
      >
        <el-card id="project-card" :body-style="{ padding: '0px' }"
                 style="width: 200px; height: auto; border-radius: 20px; " shadow="hover"
        >
          <meta name="referrer" content="no-referrer"/>
          <img
              :src="'http://43.138.71.108/api/prototype/get-img/?protoId='+graph.protoId+'&rand?='+this.rand.toString()"
              @click="openGraph(graph.protoId, graph.protoName)"
              class="image"
              alt=""/>
          <div style="padding: 10px">
            <span>{{graph.docName}}</span>
            <div class="bottom">
              <span>{{graph.protoName}}</span>
              <el-button-group>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="重命名"
                    placement="bottom"
                >
                  <el-button class="button"
                             @click="this.dialogVisible2=true; this.curGraphId=graph.protoId;"
                             round>
                    <el-icon color="gray">
                      <Edit/>
                    </el-icon>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="删除"
                    placement="bottom"
                >
                  <el-button class="button" @click="this.curGraphId=graph.protoId; deleteGraph(graph.protoId)" round>
                    <el-icon color="orange">
                      <delete/>
                    </el-icon>
                  </el-button>
                </el-tooltip>
              </el-button-group>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-scrollbar>

  <el-dialog
      v-model="dialogVisible2"
      width="25%"
      custom-class="dialog">
    <h1>重命名</h1>
    <span>请输入新的原型名称</span>
    <el-input class="input" v-model="protoName" placeholder="原型名称" clearable></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false; renameGraph(protoName); protoName=''" color="royalblue" circle><el-icon><Select /></el-icon></el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
      v-model="dialogVisible"
      width="25%"
      custom-class="dialog"
  >
    <h1 >新建原型</h1>
    <span>请输入信息</span>
    <el-input
        v-model="protoName"
        class="input"
        placeholder="名称"
        style="margin-top: 10px"
        clearable
    >
    </el-input>
    <template #footer>
        <span class="dialog-footer">
                    <el-button @click="dialogVisible=false;tmpVisible=true" style="float: left;background-color: royalblue;color: white" round>模板</el-button>
      <el-button @click="createGraph(); this.dialogVisible=false" color="royalblue" circle><el-icon><Select/></el-icon></el-button>
        </span>
    </template>
  </el-dialog>
  <CreateByTmp v-if="tmpVisible" v-model="tmpVisible" @new-created="this.tmpVisible=false" :type="'prototype'" ></CreateByTmp>
</template>

<script>
import CreateByTmp from "@/components/dialog/CreateByTmp";
export default {
  name: "NewOrigin",
  components:{
    CreateByTmp
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      tmpVisible: false,
      curGraphId: Number,
      currentDate: new Date(),
      protoName: '',
      projectId: -1,
      graphList: null,
      rand: null,
    }
  },
  methods: {
    openGraph: function (id, name){
      this.$store.commit({
        type: 'proto',
        protoId: id,
        protoName: name
      })
      this.$router.push({name: 'proto'})
    },
    createGraph: function (){
      this.$axios.post("prototype/create", {
        "name": this.protoName,
        "creatorId": this.$store.state.loginUser.userId,
        "projectId": this.projectId
      }).then(res=>{
        if(res.status === 200){
          this.$message.success("构建原型成功！");
          location.reload();
        }
      }).catch(err=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },
    deleteGraph: function (graphId){
      console.log(typeof (graphId));
      console.log(graphId)
      this.$axios.post("prototype/complete-delete", {
        "protoId": graphId,
        "deleterId": this.$store.state.loginUser.userId
      }).then(res=>{
        if(res.status === 200){
          this.$message.success("删除成功！");
          location.reload();
        }
      }).catch(err=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },
    getGraphList: function (){
      this.rand = Math.random()
      console.log("getGraphList is called!")
      this.$axios.get("prototype/list", {
        params:{
          projectId: this.projectId
        }
      }).then(res=>{
        if(res.status === 200){
          console.log(res.data)
          this.graphList = res.data.protoList;
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    renameGraph(name){
      this.$axios.post('prototype/rename', {
        "protoId": this.curGraphId,
        "newName": name,
      }).then((res)=>{
        if (res.status === 200){
          location.reload()
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created() {
    this.projectId =this.$store.state.selectProject.proId;
    this.getGraphList();
  },

}
</script>

<style scoped>
.text {
  width: 100px;
  font-size: 10px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  border: none;
  width: 30px;
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  max-height: 150px;
  object-fit: cover;
}

.input {
  margin-top: 10px;
}

.input >>> .el-input__wrapper {
  border-radius: 20px;
}

#project-card {
  margin-left: 5%;
}

#project-card:hover {
  box-shadow: 0 16px 32px rgb(0 0 0 / 8%);
  cursor: pointer;
}
</style>

  <style>
  .dialog {
    border-radius: 25px;
  }
</style>