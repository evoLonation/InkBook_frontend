<template>
  <el-dialog
      title=""
      v-model="value"
      width="30%"
      :before-close="newDocName = ''"
  >
    <div >
      <div style="height: 30px"></div>
      <header style="line-height: 30px;text-align: center; font-weight: bold;margin-bottom: 20px;">创建新文件</header>
      <div style="margin-left: 40px;margin-right: 50px;" v-if="type==='team'">
        <el-form  label-width="100px">
          <el-form-item label="文件类型" >
            <el-radio-group v-model="createType"  style=" !important;margin-left: 20px;margin-right: 0;">>
              <el-radio label="folder" size="large">文件夹</el-radio>
              <el-radio label="doc" size="large">文档</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>

      <div style="margin-left: 40px;margin-right: 50px;">
        <el-form  label-width="100px">
          <el-form-item label="文件名">
            <el-input v-model="newDocName" placeholder="文档名称" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="clickCreateTemp">从模板创建</el-button>
        <div style="display: flex;margin-top: 40px;">
          <el-button type="primary" style="margin: auto auto auto 40px " @click="createClick"><span>确定</span></el-button>
          <el-button type="primary" style="margin: auto 40px auto auto " @click="value=false"><span>取消</span></el-button>
        </div>

      </div>
      <div style="height: 30px"></div>
    </div>

  </el-dialog>
  <CreateByTmp v-if="tmpVisible" v-model="tmpVisible" @new-created="this.$emit('newCreated')" :type="this.type" :parent-id="parentId"/>
</template>

<script>
import {ElMessage} from "element-plus";
import CreateByTmp from "@/components/dialog/CreateByTmp";

export default {
  components: {CreateByTmp},
  name: "CreateFile",
  data() {
    return {
      newDocName: '',
      userId: this.$store.state.loginUser.userId,
      tmpVisible : false,
      createType: 'doc',
      teamId : this.$store.state.selectTeam.teamId,
      projectId: this.$store.state.selectProject.proId,
    }
  },
  emits: ['newCreated', 'update:modelValue'],
  props: {
    modelValue: Boolean,
    parentId: Number,
    type: String, // project 或者 team
  },
  methods: {
    createClick(){
      if(this.type === 'project'){
        this.axios.post("document/project-create", {
          "name": this.newDocName,
          "creatorId": this.userId,
          "projectId" : this.projectId,
        }).then(() => {
          this.$emit('newCreated');
          this.value = false;
          ElMessage({message: '文档创建成功', type: 'success'});
        }).catch(err => {
          ElMessage({message: err.response.data.msg, type: 'warning'});
        })
      }else {
        if(this.createType === 'doc'){
          this.axios.post("document/create", {
            "name": this.newDocName,
            "creatorId": this.userId,
            "teamId" : this.teamId,
            "parentId": this.parentId,
          }).then(() => {
            this.$emit('newCreated');
            this.value = false;
            ElMessage({message: '文档创建成功', type: 'success'});
          }).catch(err => {
            ElMessage({message: err.response.data.msg, type: 'warning'});
          })
        }else {
          this.axios.post("folder/create", {
            "name": this.newDocName,
            "creatorId": this.userId,
            "teamId" : this.teamId,
          }).then(() => {
            this.$emit('newCreated');
            this.value = false;
            ElMessage({message: '文件夹创建成功', type: 'success'});
          }).catch(err => {
            ElMessage({message: err.response.data.msg, type: 'warning'});
          })
        }
      }


    },
    clickCreateTemp() {
      this.tmpVisible = true;
      this.value = false;

    },
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.el-dialog {
  border-radius: 40px;
  object-fit:cover;
  /*width: 450px;*/

}
.el-dialog__body{
}
.el-dialog__header {
  height: 0;
  padding: 0;
}
</style>

