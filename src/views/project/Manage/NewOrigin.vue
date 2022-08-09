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
  <el-dialog
      v-model="dialogVisible"
      title="新建原型"
      width="25%"
      custom-class="dialog"
  >
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
      <el-button @click="createGraph(); this.dialogVisible=false" color="royalblue" circle><el-icon><Select/></el-icon></el-button>
        </span>
    </template>
  </el-dialog>
  <el-row>
    <el-col
        style="margin-top: 10px"
        :span="6"
        v-for="graph in graphList"
        :key="graph"
    >
      <el-card id="project-card" :body-style="{ padding: '0px' }"
               style="width: 200px; height: auto; border-radius: 20px;" shadow="hover">
        <meta name="referrer" content="no-referrer"/>
        <img
            src="../../../assets/Project/设计原型.jpeg"
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
                  content="进入"
                  placement="bottom"
              >
                <el-button class="button"
                           @click="openGraph(graph.protoId, graph.name)"
                           round>
                  <el-icon color="lightblue">
                    <Document/>
                  </el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip
                  class="item"
                  effect="dark"
                  content="编辑"
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
                <el-button class="button" @click="this.curGraphId=graph.protoId; dialogVisible3=true" round>
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
  <el-dialog
      title="编辑原型信息"
      v-model="dialogVisible2"
      width="25%"
      custom-class="dialog">
    <span>请输入新的原型信息</span>
    <el-input class="input" v-model="protoName" placeholder="原型名称" clearable></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false; renameGraph(protoName); protoName=''" color="royalblue" circle><el-icon><Select /></el-icon></el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
      title="确认删除吗"
      v-model="dialogVisible3"
      width="25%"
      custom-class="dialog">
    <span>删除后无法找回</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible3 = false; deleteGraph(this.curGraphId)" color="royalblue" circle><el-icon><Select /></el-icon></el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: "NewOrigin",
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      curGraphId: Number,
      currentDate: new Date(),
      protoName: '',
      projectId: -1,
      graphList: null,
    }
  },
  methods: {
    handleClose: function (){
      this.dialogVisable = false;
    },
    openGraph: function (id){
      console.log('打开一个原型，id为' + id)
      this.$store.state.originId = id;
      console.log('打开一个原型，id为' + this.$store.state.originId)
      this.$router.push({name: 'origin'})
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
  height: 150px;
  display: block;
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
}
</style>

  <style>
  .dialog {
    border-radius: 25px;
  }
</style>