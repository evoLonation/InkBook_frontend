<template>
  <el-dialog
      title=""
      v-model="value"
      width="30%"
      :before-close="newDocName = ''"
  >
    <div >
      <div style="height: 30px"></div>
      <header style="line-height: 30px;text-align: center; font-weight: bold;margin-bottom: 20px;">创建新文档</header>
      <div style="margin-left: 40px;margin-right: 50px;">
        <el-form  label-width="100px">
          <el-form-item label="文档名">
            <el-input v-model="newDocName" placeholder="文档名称" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
          </el-form-item>
        </el-form>
        <div style="display: flex;margin-top: 40px;">
          <el-button type="primary" style="margin: auto auto auto 40px " @click="createClick"><span>确定</span></el-button>
          <el-button type="primary" style="margin: auto 40px auto auto " @click="value=false"><span>取消</span></el-button>
        </div>

      </div>
      <div style="height: 30px"></div>
    </div>

  </el-dialog>

</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "CreateDocument",
  data() {
    return {
      newDocName: '',
      userId: this.$store.state.loginUser.userId,

    }
  },
  emits: ['newCreated', 'update:modelValue'],
  props: {
    teamId: Number,
    modelValue: Boolean,
    parentId: Number,
  },
  methods: {
    createClick(){
      this.axios.post("document/create", {
        "name": this.newDocName,
        "creatorId": this.userId,
        "teamId" : this.teamId,
        "parentId": this.parentId,
      }).then(() => {
        this.$emit('newCreated');
        this.visible = false;
        ElMessage({message: '文档创建成功', type: 'success'});
      }).catch(err => {
        ElMessage({message: err.response.data.msg, type: 'warning'});
      })
    }
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
  width: 450px;

}
.el-dialog__body{
}
.el-dialog__header {
  height: 0;
  padding: 0;
}
</style>

