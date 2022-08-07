<template>
  <div style="width: 1250px">
    <div style="border-bottom: 0 solid #e8e8e8;padding-bottom: 0; margin-bottom: 35px">
      <el-menu default-active="'/' +this.$route.path.split('/')[1]">
        <el-button style="float: right; margin-right: 20px" type="danger"><el-icon><delete/></el-icon>
          <span style="vertical-align: middle" @click="allDelete()">全部删除</span>
        </el-button>
        <el-button style="float: right; margin-right: 20px"><el-icon><Refresh/></el-icon>
          <span style="vertical-align: middle" @click="allRecover()">全部恢复</span>
        </el-button>
      </el-menu>
    </div>
      <el-row>
        <el-col
            style="margin-top: 45px"
            :span='6'
            v-for="i in projects.length"
            :key="projects[i-1]"
            >
          <el-card id="project-card" :body-style="{ padding: '0px' }"
                   style="width: 250px; height: auto" shadow="hover">
            <meta name="referrer" content="no-referrer"/>
            <img
                src="https://inews.gtimg.com/newsapp_bt/0/13680351024/641"
                class="image"
                alt=""/>
            <div style="padding: 14px;">
              <span>{{ projects[i - 1].name }}</span>
              <div class="bottom">
                <text class="text">{{ projects[i - 1].detail }}</text>
                <el-button-group>
                  <el-tooltip
                      class="item"
                      effect="dark"
                      content="恢复"
                      placement="bottom"
                  >
                  <el-button
                      @click="curProjectId=projects[i-1].id; curProjectName= projects[i-1].name; recoverProject()"><el-icon><Refresh/></el-icon>
                  </el-button>
                    </el-tooltip>
                  <el-popconfirm
                      confirmButtonText="确定"
                      cancelButtonText="取消"
                      title="确定彻底删除该项目吗？"
                      @confirm="curProjectId=projects[i-1].id; completeDeleteProject()">
                    <template #reference>
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="删除"
                          placement="bottom"
                      >
                      <el-button type="danger"><el-icon><delete/></el-icon></el-button>
                      </el-tooltip>
                    </template>
                  </el-popconfirm>
                </el-button-group>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {ref} from 'vue'

export default {
  name: "projectRec",
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
      curProjectId: Number,
      curProjectName: String,
      curProjectDetail: String,
    }
  },
  methods: {
    //获取项目列表接口函数
    getProject() {
      console.log('get project......')
      this.$axios.get('/project/recycle', {
        params: {
          teamId: this.$store.state.selectTeam.teamId,
        }
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data.msg)
          this.projects = res.data.projects
        } else {
          ElMessage('获取列表失败')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    recoverProject() {
      this.$axios.post('/project/recover', {
        "projectId": this.curProjectId
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data.msg)
          setTimeout(() => {
            this.getProject()
          }, 1000)
        } else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    completeDeleteProject() {
      this.$axios.post('/project/complete-delete', {
        "projectId": this.curProjectId
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data.msg)
          setTimeout(() => {
            this.getProject()
          }, 1000)
        } else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    allRecover() {
      let o
      for (o in this.projects) {
        this.$axios.post('/project/recover', {
          "projectId": this.projects[o].id
        }).then((res) => {
          if (res.status === 200) {
            console.log(res.data.msg)
          } else {
            ElMessage('其他错误')
          }
        }).catch((err) => {
          console.log(err)
        })
        setTimeout(() => {
          this.projects[o].id = null
        }, 200)
      }
      setTimeout(() => {
        this.getProject()
      }, 1000)
    },
    allDelete() {
      let o
      for (o in this.projects) {
        console.log(this.projects[o].id)
        this.$axios.post('/project/complete-delete', {
          "projectId": this.projects[o].id
        }).then((res) => {
          if (res.status === 200) {
            console.log(res.data.msg)
          } else {
            ElMessage('其他错误')
          }
        }).catch((err) => {
          console.log(err)
        })
        setTimeout(() => {
          this.projects[o].id = null
        }, 200)
      }
      setTimeout(() => {
        this.getProject()
      }, 1000)
    },
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
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.image {
  width: 100%;
  display: block;
}

#project-card:hover {
  box-shadow: inset 0 0 10px 2px lightgoldenrodyellow;
}
</style>