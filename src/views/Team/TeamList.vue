<template>
  <div id="list-layout">
    <div id="top-line">
      <el-input v-model="key" placeholder="请输入搜索内容">
        <template v-slot:prepend>
          <search style="width: 1em; height: 1em;"/>
        </template>
        <template v-slot:append>
          <el-button @click="GoToSearch()">搜索</el-button>
        </template>
      </el-input>
      <el-button
          style="margin: 50px auto auto auto"
          type="success"
          @click="JumpToCreate"
      >
        新建团队
      </el-button>
    </div>
    <div id="team-list">
      <el-scrollbar height="630px">
        <div
            v-for="(team, index) in teamList"
             :key="team.teamId"
            id="element-in-list"
        >
          <el-avatar
              size="size"
              id="element-avatar"
              :src="team.url"
              fit="cover"
          >
          </el-avatar>
          <div id="team-name-and-intro">
            <div id="team-name">
              <span
                  class="name-style"
              >
                {{team.name}}
              </span>
            </div>
            <div id="team-intro">
              <span
                  class="intro-style"
              >
                {{team.introduction}}
              </span>
            </div>
          </div>
          <el-button
              type="primary"
              style="margin: auto 30px auto auto"
              @click="EnterTeam(index)"
          >
            进入团队
          </el-button>
        </div>
      </el-scrollbar>
      <!--<el-empty description="还没有任何团队哦！" />-->
    </div>
  </div>
</template>

<script>

  // 引入element-ui icon
  import { Search } from "@element-plus/icons";

  export default {
    components: {
      Search
    },
    data(){
      return {
        key: '',
        // teamList: [
        //   {
        //     teamId: "00127",
        //     name: "CTS",
        //     url: '',
        //     introduction: "CTS 很简单的啦 java助教说话又好听"
        //   },
        //   {
        //     teamId: "00128",
        //     name: "软工",
        //     url: '',
        //     introduction: "金刚石文档"
        //   },
        //   {
        //     teamId: "00128",
        //     name: "软工",
        //     url: '',
        //     introduction: "金刚石文档"
        //   },
        //   {
        //     teamId: "00128",
        //     name: "软工",
        //     url: '',
        //     introduction: "金刚石文档"
        //   },
        //   {
        //     teamId: "00128",
        //     name: "软工",
        //     url: '',
        //     introduction: "金刚石文档"
        //   },
        //   {
        //     teamId: "00128",
        //     name: "软工",
        //     url: '',
        //     introduction: "金刚石文档"
        //   },
        //   {
        //     teamId: "00128",
        //     name: "软工",
        //     url: '',
        //     introduction: "金刚石文档"
        //   },
        // ],
        teamList: [],
        // testUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      }
    },

    methods: {
      JumpToCreate: function () {
        this.$router.push('/table/team/create');
      },
      EnterTeam: function (index) {
        console.log(index);
        console.log("EnterTeam is called!");
        this.$router.push({name: "team", params: {teamId: this.teamList[index].teamId}});
      },
      GoToSearch: function (){
        this.$router.push({name: "teamBlock", params: {key: this.key}})
      }
    },
    created() {
      console.log(this.$store.state.loginUser.userId);
      this.key = this.$route.params.key;
      console.log('key is ' + this.key);
      if(this.key === '' || this.key === null || this.key === undefined){
        console.log("this is empty")
        this.$axios.get("user/team", {
          params: {
            userId: this.$store.state.loginUser.userId,
          }
        }).then((res)=>{
          console.log('search team data.js = ');
          console.log(res.data);
          if(res.status === 200){
            this.teamList = res.data.teams;
            for(let i = 0; i < this.teamList.length; i++){
              console.log(typeof (this.teamList[i].teamId));
              this.teamList[i].url = 'http://43.138.71.108/api/team/get-avatar/?teamId=' + this.teamList[i].teamId;
            }
          }
        }).catch(err=>{
          console.log(err);
          this.$message.error(err.response.data.msg);
        })
      }else{
        this.$axios.get("team/search", {
          params: {
            key: this.key,
          }
        }).then((res)=>{
          console.log('search team data.js = ');
          console.log(res.data);
          if(res.status === 200){
            this.teamList = res.data.teams;
          }
        }).catch(err=>{
          console.log(err);
          this.$message.error(err.response.data.msg);
        })
      }
    }
}
</script>

<style scoped>
#list-layout {
  width: 1000px;
  height: 800px;
  border: solid #DCDCDC 3px;
  border-radius: 10px;
  margin: 0 auto auto auto;
  box-shadow: 0 0 10px 3px #DCDCDC;
  background-color: white;
}

#top-line {
  width: 100%;
  height: 140px;
  border-bottom: 1px solid lightgray;
  display: flex;
}

#top-line >>>.el-input {
  width: 500px;
  height: 45px;
  margin: 40px 0 auto 150px;
}

#team-list {
  margin: 30px 0 30px 0;
  width: 100%;
  max-height: 430px;
}

#element-in-list {
  margin: 0 auto 30px auto;
  width: 800px;
  height: 100px;
  border: 1px solid darkgray;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
}

#element-avatar {
  margin: auto 30px auto 50px;
  width: 60px;
  height: 60px;
  box-shadow: 0 0 10px 1px lightgray;
}

#team-name-and-intro {
  display: block;
  width: 500px;
  height: 100%;
  margin-right: auto;
}

#team-name {
  width: 100%;
  height: 20px;
  text-align: left;
  margin-top: 20px;
}

#team-intro {
  width: 100%;
  height: 15px;
  text-align: left;
  margin-top: 15px;
}

.name-style {
  height: 20px;
  font-size: 20px;
  margin: auto auto auto 0;
}

.intro-style {
  height: 15px;
  font-size: 15px;
  margin: auto auto auto 0;
}
</style>