<template>
  <div style="width: 1250px">
    <div style="width: 100%; display: flex">
      <el-input
          v-model="search"
          class="project-el-input"
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
          style="height: 50px;
          margin-top: 7%;
          margin-left: 25%;
          color: white;
          font-weight: bold;
          border-radius: 30px;
          background-color: royalblue;" round>
        <el-icon>
          <Plus/>
        </el-icon>
        <span style="vertical-align: middle" @click="createVisible=true">新建项目</span>
      </el-button>
      <div
          style="margin-left: 10%; margin-top: 7%; float: right;"
      >
        <el-dropdown
            class="my-el-dropdown"
        >
        <span
            class="el-dropdown-link"
        >
          &nbsp;<el-icon><Filter/></el-icon>
        </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                  class="my-dropdown-item"
              >
                按创建时间排序
                <el-button-group
                  id="my-el-btn-group1"
                  style="margin-left: 60px;"
                >
                  <el-tooltip
                      class="item"
                      effect="dark"
                      content="早到晚"
                      placement="bottom"
                  >
                    <el-button class="button"
                               round>
                      <el-icon>
                        <sort-down/>
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                      class="item"
                      effect="dark"
                      content="晚到早"
                      placement="bottom"
                  >
                    <el-button class="button"
                               @click="curProjectId=this.projects[i-1].id; curProjectName= this.projects[i-1].name; openProject()"
                               round>
                      <el-icon>
                        <sort-up/>
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </el-button-group>
              </el-dropdown-item>
              <el-dropdown-item
                  class="my-dropdown-item"
              >
                按项目名称排序
                <el-button-group
                    id="my-el-btn-group2"
                    style="margin-left: 60px"
                >
                  <el-tooltip
                      class="item"
                      effect="dark"
                      content="早到晚"
                      placement="bottom"
                  >
                    <el-button class="button"
                               round>
                      <el-icon>
                        <sort-down/>
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                      class="item"
                      effect="dark"
                      content="晚到早"
                      placement="bottom"
                  >
                    <el-button class="button"
                               @click="curProjectId=this.projects[i-1].id; curProjectName= this.projects[i-1].name; openProject()"
                               round>
                      <el-icon>
                        <sort-up/>
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </el-button-group>
              </el-dropdown-item>
              <el-dropdown-item
                  class="my-dropdown-item"
              >
                按创建作者排序
                <el-button-group
                    id="my-el-btn-group3"
                    style="margin-left: 60px"
                >
                  <el-tooltip
                      class="item"
                      effect="dark"
                      content="早到晚"
                      placement="bottom"
                  >
                    <el-button class="button"
                               round>
                      <el-icon>
                        <sort-down/>
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                  <el-tooltip
                      class="item"
                      effect="dark"
                      content="晚到早"
                      placement="bottom"
                  >
                    <el-button class="button"
                               @click="curProjectId=this.projects[i-1].id; curProjectName= this.projects[i-1].name; openProject()"
                               round>
                      <el-icon>
                        <sort-up/>
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </el-button-group>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="folder-guide"></div>
    <el-row
      style="width: 100%;"
    >
      <el-col
          style="margin-top: 35px"
          :span="6"
          v-for="i in projects.length"
          :key="projects[i-1]">
        <el-card id="project-card" :body-style="{ padding: '0px' }"
                 style="width: 250px; height: auto; border-radius: 25px;" shadow="hover">
          <meta name="referrer" content="no-referrer"/>
          <el-image
              :src="'http://43.138.71.108/api/project/get-img/?projectId='+projects[i-1].id"
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
                             @click="curProjectId=this.projects[i-1].id; curProjectName= this.projects[i-1].name; openProject()"
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
                             @click="renameVisible=true; curProjectId=this.projects[i-1].id; curProjectName= input = this.projects[i-1].name; curProjectDetail = input2 = projects[i-1].detail;"
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
                      <el-button class="button" @click="this.curProjectId=this.projects[i-1].id;deleteVisible=true" round>
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
        v-model="createVisible"
        width="25%"
        custom-class="dialog">
      <h1>新建项目</h1>
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
        v-model="renameVisible"
        width="25%"
        custom-class="dialog">
      <h1>编辑项目</h1>
      <span>请输入新的项目信息</span>
      <el-input class="input" v-model="input" placeholder="项目名称" clearable></el-input>
      <el-upload
          name="file"
          :accept="this.fileType"
          action
          :http-request="this.uploadImage"
          ref="upload"
          :limit="1"
          :file-list="this.fileList"
          :auto-upload="true"
          >
        <el-button style="margin-top: 15px" round><i ></i><el-icon><Upload/></el-icon>封面</el-button>
      </el-upload>

      <el-input  type="textarea" class="input" v-model="input2" placeholder="项目简介" clearable></el-input>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="renameVisible = false; modifyProject(input, input2); input=input2=''" color="royalblue" circle><el-icon><Select /></el-icon></el-button>
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
import {Filter, Rank, SortDown, SortUp} from "@element-plus/icons";

export default {
  name: "projectList",
  components: {SortUp, SortDown, Filter, Rank},
  setup() {
    return {
      input: ref(''),
      input2: ref(''),
    }
  },
  data() {
    return {
      search: '',
      projects: [],
      projectNum: Number,
      createVisible: false,
      renameVisible: false,
      deleteVisible: false,
      curProjectId: Number,
      curProjectName: String,
      curProjectDetail: String,
      fileList: [],
      fileType: ["png", "jpg", "bmp", "jpeg"],
      headers: { "Content-Type": "multipart/form-data" },
    }
  },
  methods: {
    uploadImage(list){
      console.log('in upload')
      const f = new FormData()
      f.append('newImg', list.file)
      f.append('projectId', this.curProjectId.toString())
      this.$axios.post('/project/modify/img', f).then(res=>{
        if (res.status === 200){
          ElMessage('上传封面成功')
          this.fileList = []
          console.log(res.data.msg)
        }
      })
    },
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
    //编辑项目接口函数
    modifyProject(name, detail) {
      if (name!==''){
        console.log(this.curProjectId, name)
        this.$axios.post("/project/rename", {
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
      }
      if (detail!==''){
        setTimeout(() => {
          this.$axios.post("/project/modify/intro", {
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
        }, 1000)
      }
      if (this.fileList.length!==0){
        this.uploadImage(this.fileList)
      }
      this.fileList = []
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
    },
  },
  mounted() {
    this.getProject()
  }
}
</script>

<style scoped>
.text {
  width: 100px;
  font-size: 10px;
  color: #999;
}

.project-el-input {
  left: 15%;
  width: 40%;
  height: 50px;
  margin-top: 7%;
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

.el-dropdown-link {
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
}

.my-el-dropdown {
  background-color: royalblue;
  width: 50px;
  height: 50px;
  border-radius: 40px;
  padding: 15px;
}

.hide {
  display: none;
}

.show {
  display: block;
}

.my-dropdown-item {
  display: flex;
  width: 250px;
  height: 50px;
}

.my-dropdown-item:hover {
  background-color: white;
}
</style>