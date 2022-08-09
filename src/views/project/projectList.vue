<template>
  <div style="width: 1250px">
    <div style="display: flex">
      <el-button
          style="height: 50px;
          margin-top: 7%;
          margin-left: 75%;
          color: white;
          font-weight: bold;
          border-radius: 30px;
          background-color: royalblue;" round>
        <el-icon>
          <Plus/>
        </el-icon>
        <span style="vertical-align: middle" @click="createVisible=true">新建项目</span>
      </el-button>
    </div>
    <div class="folder-guide"></div>
    <el-row>
      <el-col
          style="margin-top: 35px"
          :span="6"
          v-for="i in projects.length"
          :key="projects[i-1]">
        <el-card id="project-card" :body-style="{ padding: '0px' }"
                 style="width: 250px; height: auto; border-radius: 25px;" shadow="hover">
          <meta name="referrer" content="no-referrer"/>
          <el-image
              src='http://img.nga.178.com/attachments/mon_202203/28/m6Q4rqt-j7scK24T3cSu0-jt.jpg'
              class="image"></el-image>
          <div style="padding: 14px;">
            <span>{{ projects[i - 1].name }}</span>
            <div class="bottom">
              <text class="text">{{ projects[i - 1].detail }}</text>
              <el-button-group>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="进入"
                    placement="bottom"
                >
                  <el-button class="button"
                             @click="curProjectId=projects[i-1].id; curProjectName= projects[i-1].name; openProject()"
                             round>
                    <el-icon color="lightblue">
                      <Folder/>
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
                             @click="renameVisible=true; curProjectId=projects[i-1].id; curProjectName= input = projects[i-1].name; curProjectDetail = input2 = projects[i-1].detail;"
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
                      <el-button class="button" @click="this.curProjectId=projects[i-1].id;deleteVisible=true" round>
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
        title="新建项目"
        v-model="createVisible"
        width="25%"
        custom-class="dialog">
      <span>请输入项目信息</span>
      <el-input class="input" v-model="input" placeholder="项目名称" clearable></el-input>
      <el-image></el-image>
      <el-input class="input" type="textarea" v-model="input2" placeholder="项目简介" clearable></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="createVisible = false; createProject(input, input2); input=input2=''" color="royalblue" circle><el-icon><Select /></el-icon></el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog
        title="编辑项目"
        v-model="renameVisible"
        width="25%"
        custom-class="dialog">
      <span>请输入新的项目信息</span>
      <el-input class="input" v-model="input" placeholder="项目名称" clearable></el-input>
      <el-input  type="textarea" class="input" v-model="input2" placeholder="项目简介" clearable></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="renameVisible = false; renameProject(input, input2); input=input2=''" color="royalblue" circle><el-icon><Select /></el-icon></el-button>
      </span>
      </template>
    </el-dialog>
    <el-dialog
        title="确认删除吗"
        v-model="deleteVisible"
        width="25%"
        custom-class="dialog">
      <span>删除后可以在回收站找回</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteVisible = false; deleteProject()" color="royalblue" circle><el-icon><Select /></el-icon></el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {ref} from 'vue'

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
      projects: [
        {
          name: "原神3.0开发计划",
          detail: "须弥小草神啊啊啊啊啊啊啊啊啊",
          imageUrl: 'https://img.nga.178.com/attachments/mon_202207/05/m6Q2q-rl1ZcT3cSk4-sg.jpg',
        },
        {
          name: "荒野大镖客2重制版",
          detail: "1145141919810",
          imageUrl: 'https://i0.hdslb.com/bfs/article/000dc2700c488c3317936a34d4575cf69e1c77a3.png@942w_531h_progressive.webp',
        },
      ],
      projectNum: Number,
      createVisible: false,
      renameVisible: false,
      deleteVisible: false,
      curProjectId: Number,
      curProjectName: String,
      curProjectDetail: String,
    }
  },
  methods: {
    //获取项目列表接口函数
    getProject() {
      console.log('get project......')
      if (this.$store.state.isSelectTeam) {
        this.$axios.get('/project/list-team', {
          params: {
            teamId: this.$store.state.selectTeam.teamId
          }
        }).then((response) => {
          this.projects = response.data.projects
          console.log(response.data.msg)
          console.log(this.projects)
        }).catch((err) => {
          console.log(err);
          ElMessage('列表获取失败')
        })
      } else {
        this.$axios.get('/project/list-user', {
          params: {
            userId: this.$store.state.loginUser.userId
          }
        }).then((response) => {
          this.projects = response.data.projects
          console.log(response.data.msg)
          console.log(this.projects)
        }).catch((err) => {
          console.log(err);
          ElMessage('列表获取失败')
        })
      }

    },
    //创建项目接口函数
    createProject(name, detail, imgUrl) {
      if (name === '') {
        ElMessage('名字不能为空！')
        this.createVisible = true;
        return
      }
      this.$axios.post("/project/create", {
        "name": name,
        "userId": this.$store.state.loginUser.userId,
        "teamId": this.$store.state.selectTeam.teamId,
        "detail": detail,
        "imgUrl": 'https://img.nga.178.com/attachments/mon_202207/05/m6Q2q-rl1ZcT3cSk4-sg.jpg',
      }).then((response) => {
        if (response.status === 200) {
          console.log(response.data.projectId)
          console.log(response.data.msg)
          ElMessage('创建成功')
          setTimeout(() => {
            this.getProject();
          }, 700);
        } else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    //重命名项目接口函数
    renameProject(name, detail) {
      if (name === '') {
        ElMessage('名字不能为空！')
        this.renameVisible = true;
        return
      }
      console.log(this.curProjectId, name, detail)
      this.$axios.post("project/rename", {
        "projectId": this.curProjectId,
        "newName": name,
      }).then((response) => {
        if (response.status === 200) {
          ElMessage('重命名成功')
          setTimeout(() => {
            this.getProject();
          }, 700);
        } else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err);
      })
      if (detail === '') return;
      console.log(detail)
      setTimeout(() => {
        this.$axios.post("project/modify/intro", {
          "projectId": this.curProjectId,
          "newIntro": detail,
        }).then((response) => {
          if (response.status === 200) {
            ElMessage('修改简介成功')
            console.log(response.data.msg)
            setTimeout(() => {
              this.getProject();
            }, 700);
          } else {
            ElMessage('其他错误')
          }
        }).catch((err) => {
          console.log(err);
        })
      }, 1500)
    },
    openProject() {
      this.$store.commit({type: 'selectProject', proId: this.curProjectId, proName: this.curProjectName})
      this.$router.push({name: 'topTable', params:{projectId: this.curProjectId}})
    },
    //删除项目接口函数
    deleteProject() {
      this.$axios.post("project/delete", {
        "projectId": this.curProjectId,
      }).then((response) => {
        if (response.status === 200) {
          ElMessage('删除成功')
          setTimeout(() => {
            this.getProject();
          }, 700);
        } else {
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
  display: block;
}
.folder-guide {
  width: 100%;
  margin-top: 30px;
  height: 50px;
  display: flex;
  border-bottom: 4px dashed rgb(0 0 0 / 8%);
}
.input {
  margin-top: 10px;
}
.input >>> .el-input__wrapper{
  border-radius: 20px;
}
#project-card {
  margin-left: 20%;
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