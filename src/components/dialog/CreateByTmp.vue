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
                <slot></slot>
            </el-scrollbar>
          </div>
          <div style="width: 300px">
            <header style="line-height: 30px;text-align: center; font-weight: bold;margin-bottom: 20px;">按模板创建</header>
            <el-form  label-width="100px">
              <el-form-item label="文档名">
                <el-input v-model="newDocName" placeholder="文档名称" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
              </el-form-item>
            </el-form>
            <el-scrollbar height="480px">
              <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
              >
                <el-menu-item index="2" style="height: 40px">
                  <el-icon><Document /></el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="2" style="height: 40px">
                  <el-icon><Document /></el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="2" style="height: 40px">
                  <el-icon><Document /></el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </div>

        </div>



        <div style="height: 30px"></div>
      </div>

    </el-dialog>
  </div>


</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "CreateByTmp",
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
#create-by-tmp .el-dialog {
  border-radius: 40px;
  object-fit:cover;
  /*width: 1200px;*/

}
.el-dialog__body{
}
.el-dialog__header {
  height: 0;
  padding: 0;
}
</style>

