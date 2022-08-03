<template>
<!--  操作栏，目前只有新建功能-->
  <div style="margin: 25px 0 35px 0;border-bottom: 1px solid #e8e8e8;padding-bottom: 10px">
    <el-menu default-active="'/' +this.$route.path.split('/')[1]" >
      <el-button type="primary" style="margin-top: 0; float: right; margin-right: 20px" icon="Plus">
        <span style="vertical-align: middle" @click="createVisible=true" >新建项目</span>
      </el-button>
    </el-menu>
  </div>
<!--  项目列表，卡片形式-->
  <el-row>
    <el-col
        :span="8"
        v-for="i in projects.length"
        :key="projects[i-1]"
        :offset="i > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <img
            src="require({{projects[i-1].imageUrl}})"
            class="image"
         alt=""/>
        <div style="padding: 14px;">
          <span>{{projects[i-1].name}}</span>
          <div class="bottom">
            <text class="text">{{ projects[i-1].detail }}</text>
            <el-button type="primary" class="button" @click="openProject">进入</el-button>
<!--            删除项目对话框-->
            <el-popconfirm
                confirmButtonText="确定"
                cancelButtonText="取消"
                icon="el-icon-info"
                iconColor="red"
                title="确定删除该项目吗？"
                @confirm="curProjectId=projects[i-1].id; deleteProject()">
              <template #reference>
                <el-button type="important" class="button">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button type="text" class="button" @click="renameVisible=true; curProjectId=projects[i-1].id">编辑</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
<!--  新建项目对话框-->
  <el-dialog
      title="新建项目"
      v-model="createVisible"
      width="30%">
    <span>请输入项目信息</span>
    <el-input style="margin-top: 10px" v-model="input" placeholder="项目名称"></el-input>
    <el-input style="margin-top: 10px" v-model="input2" placeholder="项目简介"></el-input>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="createVisible = false">取 消</el-button>
      <el-button type="primary" @click="createVisible = false; createProject(input, input2); input=input2=''">确 定</el-button>
    </span>
    </template>
  </el-dialog>
<!--  重命名项目对话框-->
  <el-dialog
      title="重命名项目"
      v-model="renameVisible"
      width="30%">
    <span>请输入新的项目名字</span>
    <el-input style="margin-top: 10px" v-model="input" placeholder="项目名称"></el-input>
    <el-input style="margin-top: 10px" v-model="input2" placeholder="项目简介"></el-input>
    <template #footer>
    <span class="dialog-footer">
      <el-button @click="renameVisible = false">取 消</el-button>
      <el-button type="primary" @click="renameVisible = false; renameProject(input, input2); input=input2=''">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";
import {ref } from 'vue'

export default {
  name: "projectList",
  setup() {
    return {
      input: ref(''),
      input2: ref(''),
    }
  },
  mounted() {
    this.getProject()
  },
  data() {
    return {
      projects:[
        {
          name: "原神3.0开发计划",
          detail: "须弥小草神啊啊啊啊啊啊啊啊啊",
          imageUrl: 'https://img.nga.178.com/attachments/mon_202207/05/m6Q2q-rl1ZcT3cSk4-sg.jpg',
        },
        {
          name: "荒野大镖客2重制版",
          detail: "1145141919810",
          imageUrl:'https://i0.hdslb.com/bfs/article/000dc2700c488c3317936a34d4575cf69e1c77a3.png@942w_531h_progressive.webp',
        },
      ],
      projectNum: Number,
      createVisible: false,
      renameVisible: false,
      curProjectId: Number,
      teamId: 1,
    }
  },
  methods: {
    //获取项目列表接口函数
    getProject(){
      this.$axios.get('/project/list-team', {
        params: {
          teamId: this.teamId,
        }
      }).then((response) => {
        if (response.status === 200) {
          this.projects = response.data.projects
          console.log(response.data.msg)
          console.log(this.projects)
        }
        else {
          ElMessage('列表获取失败')
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    //创建项目接口函数
    createProject(name, detail, imgUrl){
      if (name===''){
        ElMessage('名字不能为空！')
        this.createVisible=true;
        return
      }
      let userId = this.$store.state.loginUser.userId
      console.log(userId)
      this.$axios.post("/project/create", {
        "name": name,
        "userId": userId,
        "teamId": this.teamId,
        "detail": detail,
        "imgUrl": 'https://img.nga.178.com/attachments/mon_202207/05/m6Q2q-rl1ZcT3cSk4-sg.jpg',
      }).then((response) => {
        if (response.status === 200){
          console.log(response.data.projectId)
          console.log(response.data.msg)
          ElMessage('创建成功')
          setTimeout(() => {
            this.getProject();
          }, 700);
        }
        else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    //重命名项目接口函数
    renameProject(name, detail){
      if (name===''){
        ElMessage('名字不能为空！')
        this.renameVisible=true;
        return
      }
      console.log(this.curProjectId, name, detail)
      this.$axios.post("project/rename", {
        "projectId": this.curProjectId,
        "newName": name,
      }).then((response) => {
        if (response.status === 200){
          ElMessage('重命名成功')
          setTimeout(() => {
            this.getProject();
          }, 700);
        }
        else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err);
      })
      if (detail==='') return;
      console.log(detail)
      setTimeout(() => {},1500)
      this.$axios.post("project/modify/intro", {
        "projectId": this.curProjectId,
        "newIntro": detail,
      }).then((response) => {
        if (response.status === 200){
          ElMessage('修改简介成功')
          console.log(response.data.msg)
          setTimeout(() => {
            this.getProject();
          }, 700);
        }
        else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    openProject(){
      ElMessage('路由跳转到项目页')
    },
    //删除项目接口函数
    deleteProject(){
      this.$axios.post("project/delete", {
        "projectId": this.curProjectId,
      }).then((response) => {
        if (response.status === 200){
          ElMessage('删除成功')
          setTimeout(() => {
            this.getProject();
          }, 700);
        }
        else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>
.text {
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
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>