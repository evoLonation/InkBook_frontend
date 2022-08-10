<template>
  <div id="team-layout">
    <div id="team-header">
      <el-avatar :size="125" style="float: left; margin-left: 80px" @click="changeImg" class="teamImg" >
        <template #default>
          <el-avatar :size="120" :src="this.$store.state.teamAvatar" fit="cover"/>
        </template>
      </el-avatar>
      <div
          id="name-and-intro"
      >
        <div
            id="team-name"
            v-if="isChanged === false"
        >
          <span>{{ModifiedName}}</span>
        </div>
        <div>
          <el-input
              v-model="TeamName"
              autosize
              type="text"
              placeholder="请输入团队名称"
              v-if="isChanged === true"
              style="width: 250px; margin: 15px auto auto 0"
          >
          </el-input>
        </div>
        <div>
          <el-input
              v-model="TeamIntro"
              :autosize="{minRows: 2, maxRows: 4}"
              type="textarea"
              placeholder="请输入团队简介"
              v-if="isChanged === true"
              style="width: 350px; margin: 14px auto 11px 0"
          >
          </el-input>
        </div>
        <div
            id="team-intro"
            v-if="isChanged === false"
        >
          <span>{{TeamIntro}}</span>
        </div>
        <div
          style="margin: 0 auto auto auto"
        >
          <el-button
              v-if="UserType === 0 && isChanged === false"
              style="margin-top: 30px"
              @click="changing"
          >
            修改
          </el-button>
          <input
              type="file"
              ref="clearFile"
              style="display: none"
              @change="upload($event)"
          />
          <el-button
              v-if="UserType === 0 && isChanged === true"
              @click="EndChange"
              style="margin-top: 3px"
              type="success"
          >
            完成
          </el-button>
        </div>
      </div>
      <div>
        <div v-if="UserType === 0">
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="确认要解散团队吗？"
              @confirm="dropTeam"
          >
            <template #reference>
              <el-button
                  type="danger"
                  style="width: 150px; margin-top: 30px; margin-right: 50px"
              >
                解散团队
              </el-button>
            </template>
          </el-popconfirm>
        </div>
        <div v-if="UserType !== 2 && UserType !== 3">
          <el-button
              type="primary"
              style="width: 150px; margin-top: 25px; margin-right: 50px"
              @click="ShowQRCode"
          >
            邀请新成员
          </el-button>
<!--          <QRcode-->
<!--            ref="dialog"-->
<!--          >-->
<!--          </QRcode>-->
        </div>
        <div v-if="UserType !== 0">
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="确认要离开团队吗？"
              @confirm="leaveTeam"
          >
            <template #reference>
              <el-button
                  type="danger"
                  style="width: 150px; margin-top: 55px; margin-right: 50px"
                  v-if="UserType === 2"
              >
                离开团队
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="确认要离开团队吗？"
              @confirm="leaveTeam"
          >
            <template #reference>
              <el-button
                  type="danger"
                  style="width: 150px; margin-top: 25px; margin-right: 50px"
                  v-if="UserType === 1"
              >
                离开团队
              </el-button>
            </template>
          </el-popconfirm>
        </div>
<!--        <div>-->
<!--          <el-button-->
<!--            style="width: 150px; margin-top: 15px; margin-right: 50px"-->
<!--            type="success"-->
<!--            @click="getProject"-->
<!--            v-if="(this.UserType === 0) || (this.UserType === 1) || (this.UserType === 2)"-->
<!--          >-->
<!--            进入团队-->
<!--          </el-button>-->
<!--        </div>-->
      </div>
    </div>
    <div
        id="member-sign"
    >
      <div
          style="width: 55px; height: 70%; margin: 0 0 auto 0; border-right: 1px solid lightgray"
        >
        <Avatar style="width: 1.1em; height: 1.1em"/>
      </div>
      <div
        style="height: 15px; font-size: 15px; margin: 0 auto auto 25px;"
      >
        <span>团队成员</span>
      </div>
    </div>
    <!--<el-empty description="团队成员空空如也"/>-->
    <el-scrollbar height="380px">
      <div
          v-for="Mem in MemList"
          :key="Mem.userId"
          id="mem-in-list"
      >
        <div>
          <el-avatar
              :size="65"
              :src="Mem.url"
              fit="cover"
              style="margin: 17px auto auto 40px; cursor: pointer"
              @click="goUser(Mem.userId)"
          >
          </el-avatar>
        </div>
        <div
          id="name-and-nick"
        >
          <div id="mem-info">
            <span
                style="height: 20px; font-size: 20px; margin: auto 0 auto 0; font-weight: 500"
            >
              {{Mem.userId}}
            </span>
            <span
                style="height: 15px; font-size: 15px; margin: auto auto auto 15px"
            >
              昵称：{{Mem.name}}
            </span>
          </div>
          <div id="mem-intro">
            <span
              style="height: 15px; font-size: 15px; color: #606266"
            >
              {{Mem.intro}}
            </span>
          </div>
        </div>
        <img v-if="Mem.identity === 0" src="../../assets/Team/群主.png" alt="">
        <img
            v-else-if="Mem.identity === 1"
            src="../../assets/Team/管理员.png"
            style="width: 50px; height: 50px; margin: 27px 0 auto 30px"
             alt=""
        >
        <img
            v-else
            src="../../assets/Team/人员.png"
            style="width: 50px; height: 50px; margin: 27px 0 auto 30px"
            alt=""
        >
        <div id="operation" v-if="UserType === 0 && Mem.identity !== 0">
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-type="取消"
              title="确认要将该成员设置为管理员吗?"
              v-if="Mem.identity === 2"
              @confirm="addMonitor(Mem.userId)"
          >
            <template #reference>
              <el-button
                  style="margin: 35px 0 auto 10px;"
              >
                设为管理
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-type="取消"
              title="确认要将该管理员撤销吗?"
              v-if="Mem.identity === 1"
              @confirm="removeMonitor(Mem.userId)"
          >
            <template #reference>
              <el-button
                  style="margin: 35px 0 auto 10px;"
              >
                撤销管理
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="确认将该成员移除团队吗？"
              @confirm="removeMem(Mem.userId)"
          >
            <template #reference>
              <el-button
                type="danger"
                style="margin: 35px auto auto 13px"
              >
                移除成员
              </el-button>
            </template>
          </el-popconfirm>
        </div>
        <div id="monitor-operation" v-if="UserType === 1 && Mem.identity !== 0">
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-type="取消"
              title="是否将该成员设置为管理员?"
              @confirm="addMonitor(Mem.userId)"
          >
            <template #reference>
              <el-button
                  style="margin: 35px 0 auto 10px;"
                  v-if="Mem.userId !== loadingID && Mem.identity === 2"
              >
                设为管理
              </el-button>
              <el-button
                  style="margin: 35px 0 auto 10px;"
                  v-else
                  disabled
              >
                设为管理
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="确认将该成员移除团队吗？"
              @confirm="removeMem(Mem.userId)"
          >
            <template #reference>
              <el-button
                  type="danger"
                  style="margin: 35px auto auto 13px"
                  v-if="Mem.identity !== 1"
              >
                移除成员
              </el-button>
              <el-button
                  type="danger"
                  style="margin: 35px auto auto 13px"
                  v-else
                  disabled
              >
                移除成员
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { Avatar } from "@element-plus/icons";

export default {
  name: "MyTeam",
  components: {
    Avatar,
    // QRcode
  },
  data() {
    return {
      TeamId: '',
      TeamName: '',
      TeamIntro: '',
      TeamImg: '',
      UserType: 0,
      loadingID: '002',
      // MemList: [
      //   {
      //     MemId: "001",
      //     NickName: 'Evolution',
      //     name: "赵正阳",
      //     url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      //     introduction: "石墨文档成员",
      //     isOwner: true,
      //     isMonitor: false
      //   },
      //   {
      //     MemId: "002",
      //     NickName: 'Jerry',
      //     name: "姜星如",
      //     url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      //     introduction: "金刚石文档",
      //     isOwner: false,
      //     isMonitor: true
      //   },
      //   {
      //     MemId: "003",
      //     NickName: 'Joey',
      //     name: "龙亿舟",
      //     url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      //     introduction: "软工开发爱好者",
      //     isOwner: false,
      //     isMonitor: true
      //   },
      //   {
      //     MemId: "004",
      //     NickName: 'Bob',
      //     name: "杨宇涵",
      //     url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      //     introduction: "喜欢后端开发",
      //     isOwner: false,
      //     isMonitor: false
      //   },
      //   {
      //     MemId: "004",
      //     NickName: 'Bob',
      //     name: "杨宇涵",
      //     url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      //     introduction: "喜欢后端开发",
      //     isOwner: false,
      //     isMonitor: false
      //   },
      //   {
      //     MemId: "004",
      //     NickName: 'Bob',
      //     name: "杨宇涵",
      //     url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      //     introduction: "喜欢后端开发",
      //     isOwner: false,
      //     isMonitor: false
      //   },
      // ],
      MemList: null,
      isChanged: false,
      MonitorNum: -1,
    }
  },
  computed: {
    ModifiedName() {
      if(this.TeamName.length <= 9){
        return this.TeamName;
      }
      else{
        let tmp = "";
        for(let i = 0; i < 9; i++){
          tmp += this.TeamName[i];
        }
        tmp += '…';
        return tmp;
      }
    },
  },
  methods : {
    changing: function () {
      this.isChanged = true;
    },
    EndChange: function () {
      this.isChanged = false;

      // 修改团队名称
      this.$axios.post("team/modify/name",
          {
            "teamId": this.TeamId,
            "newName": this.TeamName,
          }).then((res)=>{
            if(res.status === 200) {
              console.log('change name data.js = ');
              console.log(res.data);
              this.$message.success("修改团队名称成功！");
              this.$store.commit({
                type: "selectTeam",
                teamId: this.TeamId,
                teamName: this.TeamName,
              })
            }
      }).catch((err)=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })

      // 修改团队简介
      this.$axios.post("team/modify/introduction",
          {
            "teamId": this.TeamId,
            "newIntro": this.TeamIntro,
          }).then((res)=>{
            if(res.status === 200){
              console.log('change introduction data.js = ');
              console.log(res.data);
              this.$message.success("修改团队简介成功！");
            }
      }).catch((err)=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },

    addMonitor: function (MemId) {
      if(this.MonitorNum >= 2){
        this.$message.warning("管理员数量到达上限");
        return;
      }
      this.$axios.post("team/setAdmin", {
        "teamId": this.TeamId,
        "operatorId": this.$store.state.loginUser.userId,
        "memberId": MemId
      }).then(res=>{
        if(res.status === 200){
          this.$message.success("设置管理员成功！");
          console.log("设置管理员成功！")
          location.reload();
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },

    removeMonitor: function (MemId) {
      console.log("removeMonitor is called!");
      console.log(typeof (this.TeamId));
      console.log(this.TeamId);
      console.log(typeof (this.$store.state.loginUser.userId));
      console.log(this.$store.state.loginUser.userId);
      console.log(typeof (MemId));
      console.log(MemId);
      this.$axios.post("team/removeAdmin", {
        "teamId": this.TeamId,
        "operatorId": this.$store.state.loginUser.userId,
        "memberId": MemId
      }).then(res=>{
        if(res.status === 200){
          this.$message.success("撤销管理员成功！");
          console.log("撤销管理员成功！");
          location.reload();
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },

    changeImg: function () {
      if(this.UserType !== 0) return;
      console.log("changeImg is called!");
      console.log("with userType" + this.UserType);
      this.$refs.clearFile.click();
    },

    upload: function (e) {
      console.log("upload is called!");
      console.log(e.currentTarget.files);
      console.log(e.currentTarget.files[0].name);
      const form = new FormData();
      form.append("file", e.currentTarget.files[0]);
      console.log(this.TeamId);
      console.log(typeof (this.TeamId))
      form.append("team_id", this.TeamId);
      console.log(form);
      this.$axios.post("team/modify-avatar", form).then((response)=>{
        if(response.status === 200){
          console.log('change avatar data.js = ');
          console.log(response.data);
          this.$message.success("上传图片成功！");
          this.getAvatar();
          // location.reload()
          this.$store.commit('changeTeamAvatar')
        }
      }).catch((err) => {
        console.log(err);
        this.$message.error(err.response.data.msg);
      });
    },

    ShowQRCode: function (){
      this.$router.push({name: "qrcode", params: {teamId: this.TeamId}});
    },

    goUser: function (userId){
      console.log("goUser is called");
      console.log(userId);
      this.$router.push({ name : 'UserInfo', params: {userId: userId}});
    },

    removeMem: function (memberId){
      console.log("removeMem is called");
      this.$axios.post("team/remove", {
        "teamId": this.TeamId,
        "operatorId": this.$store.state.loginUser.userId,
        "memberId": memberId,
      }).then((res)=>{
        if(res.status === 200){
          console.log('remove mem data.js = ');
          console.log(res.data);
          this.$message.success("成功移除");
          location.reload();
        }
      }).catch(err=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },

    dropTeam: function (){
      console.log("dropTeam is called!");
      this.$axios.post("team/dismiss", {
        "teamId" : this.TeamId,
        "userId": this.$store.state.loginUser.userId,
      }).then((res)=>{
        if(res.status === 200) {
          console.log('dropTeam data.js = ');
          console.log(res.data);
          this.$message.success("解散成功");
          this.$router.back();
        }
      }).catch((err)=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },

    leaveTeam: function () {
      console.log("leaveTeam is called!");
      this.$axios.post("team/leave", {
        "teamId": this.TeamId,
        "userId": this.$store.state.loginUser.userId,
      }).then((res)=>{
        if(res.status === 200){
          console.log("dropTeam data.js = ");
          console.log(res.data);
          this.$message.success("成功离开团队！");
          this.$router.push({name: 'teamList', params: {key: ''}});
        }
      }).catch((err)=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },

    transPri: function (memberId){
      console.log("transPri is called");
      this.$axios.post("team/transfer", {
        "teamId": this.TeamId,
        "operatorId": this.$store.state.loginUser.userId,
        "memberId": memberId
      }).then((res)=>{
        if(res.status === 200){
          console.log('transPri data.js = ');
          console.log(res.data);
          this.$message.success("成功转让!");
          location.reload();
        }
      }).catch((err)=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },

    checkUserType: function (){
      // console.log("checkUserType is called!");
      // console.log(this.$store.state.loginUser.userId);
      // console.log(this.TeamId)
      this.axios.get("team/getIdentity", {
        params: {
          userId: this.$store.state.loginUser.userId,
          teamId: this.TeamId,
        }
      }).then((res)=>{
        // console.log("this is entered!");
        // console.log(res);
        if(res.status === 200) {
          // console.log(res.data.identity);
          this.UserType = res.data.identity;
          // console.log(this.UserType);
        }
      }).catch((err)=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
      // console.log(this.UserType)
    },

    getAvatar: function (){
      this.TeamImg = 'http://43.138.71.108/api/team/get-avatar/?teamId=' + this.TeamId;
      console.log('getavatar work ' + this.TeamImg)
    },

    getTeamInformation: function (){
      // console.log('getTeamInformation is called');
      // console.log('teamId is ' + this.TeamId);

      // 获取团队文字信息
      this.$axios.get("team/information", {
        params: {
          teamId: this.TeamId,
        }
      }).then(res =>{
        if(res.status === 200){
          // console.log('get information data.js = ');
          // console.log(res.data);
          this.TeamName = res.data.name;
          this.TeamIntro = res.data.intro;
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.response.data.msg);
      })

      // 获取团队图像信息
      // this.$axios.get("team/get-avatar", {
      //   params: {
      //     teamId: this.TeamId,
      //   }
      // }).then(res => {
      //   if(res.status === 200){
      //     console.log('get-avatar data.js = ');
      //     console.log(res.data.js);
      //     this.TeamImg = res.data.js.url;
      //   }
      // }).catch((err) => {
      //   console.log(err);
      // })

      this.$axios.get("team/getAdminNum" ,{
        params: {
          teamId: this.TeamId
        }
      }).then(res => {
        if(res.status === 200){
          // console.log('get mems num is ');
          this.MonitorNum = res.data.num;
          // console.log(res.data.num);
        }
      }).catch(err=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })

      this.$axios.get("team/member", {
        params: {
          teamId: this.TeamId
        }
      }).then(res => {
        if(res.status === 200){
          console.log('get mems data.js = ');
          console.log(res.data)
          console.log(typeof (res.data.members))
          this.MemList = res.data.members;
          for(let i = 0; i < this.MemList.length; i++){
            this.MemList[i].url = 'http://43.138.71.108/api/user/get-avatar/?userId=' + this.MemList[i].userId;
          }
        }
      }).catch((err)=>{
        console.log(err);
        this.$message.error(err.response.data.msg);
      })
    },

    getProject: function (){
      this.$store.commit({type: 'selectTeam', teamId: this.TeamId, teamName: this.TeamName});
      this.$router.push('/teamProject');
    }
  },
  created() {
    console.log(this.$store.state.loginUser.userId);
    this.TeamId = parseInt(this.$route.params.teamId);
    console.log(this.TeamId)
    this.checkUserType();
    this.getAvatar();
    this.getTeamInformation();
    console.log('parseInt(0.0000005) = ',parseInt(0.0000005));
  }
}
</script>

<style scoped>
#team-layout {
  width: 1000px;
  height: 700px;
  border: solid #DCDCDC 3px;
  border-radius: 10px;
  margin: 10px auto 0 auto;
  box-shadow: 0 0 16px 10px rgb(0 0 0 / 8%);
  background-color: white;
}

#team-header {
  width: 90%;
  height: 190px;
  margin: 50px auto auto auto;
  display: flex;
}

#name-and-intro {
  height: 100%;
  width: 400px;
  margin: auto 0 auto 50px;
  text-align: left;
}

#team-name {
  width: 100%;
  height: 35px;
  font-size: 35px;
  font-weight: 750;
  margin: 20px auto auto auto;
}

#team-intro {
  width: 100%;
  height: 17px;
  font-size: 17px;
  margin: 25px auto auto auto;
}

#member-sign {
  width: 90%;
  height: 30px;
  display: flex;
  margin: 0 auto auto auto;
  border-bottom: 1px solid lightgray;
}

#mem-in-list {
  width: 800px;
  height: 100px;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  margin: 30px auto 0 auto;
}

#name-and-nick {
  width: 300px;
  height: 100%;
  display: block;
  margin-left: 30px;
  text-align: left;
}

#mem-info {
  width: 100%;
  height: 25px;
  margin: 20px auto 0 auto;
}

#mem-intro {
  width: 100%;
  height: 20px;
  margin: 15px auto auto auto;
}

#operation {
  width: 200px;
  height: 100%;
  margin: auto;
  display: block;
}

#monitor-operation {
  width: 200px;
  height: 100%;
  margin: auto;
  display: block;
}

#team-layout >>>.el-scrollbar {
  height: 430px;
}
</style>