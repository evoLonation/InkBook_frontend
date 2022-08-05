<template>
  <div
    style="width: 100%; height: 80px; border-bottom: 1px solid lightgray; position: fixed; top: 120px; z-index: 10; background: linear-gradient(45deg, white, #f4f4f5)"
  >
    <el-button
        style="width: 100px; margin: 20px 50px auto 1200px"
        type="success"
        @click="dialogVisable = true"
    >
      添加UML
    </el-button>
    <el-dialog
      v-model="dialogVisable"
      title="添加UML"
      width="30%"
      :before-close="handleClose"
    >
      <span>UML名称</span>
      <el-input
        v-model="graphName"
        placeholder="请输入UML名称"
        style="margin-top: 10px"
      >
      </el-input>
      <el-button
          type="success"
          @click="createGraph"
          style="margin: 20px 40px auto 310px"
      >
        确认
      </el-button>
      <el-button
          @click="handleClose"
          style="margin: 20px 0 auto 0;"
          type="danger"
      >
        取消
      </el-button>
    </el-dialog>
  </div>
  <el-row
      style="z-index: 2; float: left; top: -589px; bottom: -550px; min-height: 1530px; background-color: white; width: 100%"
  >
    <div
        v-for="graph in graphList"
        :key="graph"
    >
      <el-card
          :body-style="{ padding: '0px' }"
          style="width: 250px; height: 350px; margin: 30px 25px 30px 25px"
      >
<!--        <img-->
<!--            src="../../assets/Project/UML图布局.jpeg"-->
<!--            class="image"-->
<!--            style="height: 260px; object-fit: cover"-->
<!--            alt=""-->
<!--        />-->
        <img
            src="../../../assets/Project/UML图布局.jpeg"
            class="image"
            style="height: 260px; object-fit: cover"
            alt=""
        />
        <div style="padding: 14px">
          <span>{{graph.docName}}</span>
          <div class="bottom">
            <span>{{graph.name}}: {{graph.ModifyInfo}}</span>
            <el-dropdown style="width: 100px">
              <span class="el-dropdown-link">
                操作
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                      style="color: #409EFF"
                      @click="openGraph(graph.graphId)"
                  >
                    修改文件
                  </el-dropdown-item>
                  <el-dropdown-item
                      style="color: #F56C6C"
                      @click="deleteGraph(graph.graphId)"
                  >
                    删除文件
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-card>
    </div>
  </el-row>
</template>

<script>
import {ElMessage} from "element-plus";


export default {
  data(){
    return{
      dialogVisable: false,
      currentDate: new Date(),
      graphName: '',
      projectId: -1,
      graphList: null,
    }
  },
  methods: {
    handleClose: function (){
      this.dialogVisable = false;
      ElMessage.warning('构建UML取消')
    },
    openGraph: function (id){
      this.$store.state.graphId = id;
      this.$router.push({name: 'uml'})
    },
    createGraph: function (){
      this.$axios.post("graph/create", {
        "name": this.graphName,
        "creatorId": this.$store.state.loginUser.userId,
        "projectId": this.projectId
      }).then(res=>{
        if(res.status === 200){
          this.$message.success("构建UML成功！");
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
      this.$axios.post("graph/complete-delete", {
        "graphId": graphId,
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
      this.$axios.get("graph/list", {
        params:{
          projectId: this.projectId
        }
      }).then(res=>{
        if(res.status === 200){
          console.log(res.data)
          if(res.data.graphList.length !== 0) {
            this.graphList = res.data.graphList;
          }
        }
      }).catch(err=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    }
  },
  created() {
    this.projectId = parseInt(this.$route.params.projectId);
    this.getGraphList();
  }
}

</script>

<style>
.time {
  font-size: 12px;
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
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
