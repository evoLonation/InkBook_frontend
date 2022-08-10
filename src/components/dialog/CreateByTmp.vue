<template>
  <div id="create-by-tmp">
    <el-dialog
        title=""
        v-model="value"
        width="1200px"
        :before-close="newDocName = ''"
    >
      <div >
        <div style="display: flex;">
          <div style="width: 900px; height: 600px">
            <el-scrollbar height="600px">
<!--                <slot></slot>-->
              <Preview :content="currentTempContent" :title="currentTempName" v-if="type === 'team' || type === 'project'"/>
              <GraphPreview :content="currentTempContent" :title="currentTempName" v-if="(type === 'graph' || type === 'prototype') && currentTempContent!==''"/>
            </el-scrollbar>
          </div>
          <div style="width: 300px">
            <header style="line-height: 30px;text-align: center; font-weight: bold;margin-bottom: 20px;">按模板创建</header>
            <el-form  label-width="100px">
              <el-form-item :label="text+'名称'">
                <el-input v-model="newDocName" :placeholder="text+'名称'" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
              </el-form-item>
            </el-form>
            <div style="height: 480px">
              <el-scrollbar height="480px">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                >
                  <el-menu-item :index="index" v-for="(temp, index) in tempList" :key="{temp, index}"  style="height: 40px" @click="clickItem(temp)">
                    <el-icon v-if="type === 'team' || type === 'project'"><Document /></el-icon>
                    <el-icon v-else-if="type === 'prototype'"><Monitor /></el-icon>
                    <el-icon v-else-if="type === 'uml'"><Postcard /></el-icon>

                    <span> {{temp.name}} </span>
                  </el-menu-item>
                  <!--                <el-menu-item index="2" style="height: 40px">-->
                  <!--                  <el-icon><Document /></el-icon>-->
                  <!--                  <span>Navigator Two</span>-->
                  <!--                </el-menu-item>-->
                  <!--                <el-menu-item index="2" style="height: 40px">-->
                  <!--                  <el-icon><Document /></el-icon>-->
                  <!--                  <span>Navigator Two</span>-->
                  <!--                </el-menu-item>-->
                  <!--                <el-menu-item index="2" style="heigh40px">-->
                  <!--                  <el-icon><Document /></el-icon>-->
                  <!--                  <span>Navigator Two</span>-->
                  <!--                </el-menu-item>-->
                </el-menu>
              </el-scrollbar>
            </div>

            <div style="display: flex;margin-top: 40px;">
              <el-button type="primary" style="margin: auto auto auto 40px " @click="createClick"><span>确定</span></el-button>
              <el-button type="primary" style="margin: auto 40px auto auto " @click="value=false"><span>取消</span></el-button>
            </div>
          </div>

        </div>



        <div style="height: 30px"></div>
      </div>

    </el-dialog>
  </div>


</template>

<script>
import {ElMessage} from "element-plus";
import Preview from "@/views/document/Preview";
import GraphPreview from "@/views/project/UMLEdit/GraphPreview";

export default {
  name: "CreateByTmp",
  components: {
    Preview,
    GraphPreview
  },
  data() {
    return {
      newDocName: '',
      userId: this.$store.state.loginUser.userId,
      teamId : this.$store.state.selectTeam.teamId,
      projectId: this.$store.state.selectProject.proId,

      currentTempId : 0,
      currentTempContent : '',
      currentTempName: '',
      tempList: [],
      text: '文档',
    }
  },
  emits: [ 'update:modelValue'],
  props: {
    modelValue: Boolean,
    parentId: Number,
    type: String, // project , team(前两个是文档), uml , prototype
  },
  methods: {
    clickItem(temp) {
      this.currentTempId = temp.templateId;
      this.currentTempContent = temp.content;
      this.currentTempName = temp.name;
    },
    createClick() {
      if(this.type === 'project'){
        this.axios.post("document/project-create", {
          "name": this.newDocName,
          "creatorId": this.userId,
          "projectId" : this.projectId,
          "templateId" : this.currentTempId,
        }).then(() => {
          this.$emit('newCreated');
          this.value = false;
          ElMessage({message: '文档创建成功', type: 'success'});
        }).catch(err => {
          ElMessage({message: err.response.data.msg, type: 'warning'});
        })
      }else if(this.type === 'team') {
        this.axios.post("document/create", {
          "name": this.newDocName,
          "creatorId": this.userId,
          "teamId" : this.teamId,
          "parentId": this.parentId,
          "templateId" : this.currentTempId,
        }).then(() => {
          this.$emit('newCreated');
          this.value = false;
          ElMessage({message: '文档创建成功', type: 'success'});
        }).catch(err => {
          ElMessage({message: err.response.data.msg, type: 'warning'});
        })
      }else if(this.type === 'prototype') {
        this.axios.post("prototype/create", {
          "name": this.newDocName,
          "creatorId": this.userId,
          "projectId" : this.projectId,
          "templateId" : this.currentTempId,
        }).then(() => {
          this.$emit('newCreated');
          this.value = false;
          ElMessage({message: '页面创建成功', type: 'success'});
        }).catch(err => {
          ElMessage({message: err.response.data.msg, type: 'warning'});
        })
      }else {
        this.axios.post("graph/create", {
          "name": this.newDocName,
          "creatorId": this.userId,
          "projectId" : this.projectId,
          "templateId" : this.currentTempId,
        }).then(() => {
          this.$emit('newCreated');
          this.value = false;
          ElMessage({message: 'UML图创建成功', type: 'success'});
        }).catch(err => {
          ElMessage({message: err.response.data.msg, type: 'warning'});
        })
      }
    }
  },
  created() {
    let type;
    if(this.type === 'project' || this.type === 'team'){
      type = 1;
      this.text = '文档';
    }else if(this.type === 'prototype'){
      type = 2;
      this.text = '页面';
    }else if(this.type === 'uml'){
      type = 3;
      this.text = 'UML图';
    }
    console.log('created by tmp created!')
    this.axios.get('template/list', {
      params: {
        type: type,
      }
    }).then(res=>{
      this.tempList = res.data.templateList;
      console.log(this.tempList)
    }).catch(err => {
      console.log(err)
      ElMessage({message: err.response.data.msg, type: 'warning'});
    })
  },

  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    },
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#create-by-tmp .el-dialog {
  border-radius: 40px;
  object-fit:cover;
  width: 1200px;

}
.el-dialog__body{
}
.el-dialog__header {
  height: 0;
  padding: 0;
}
</style>

