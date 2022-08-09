<template>
  <el-dialog
      title=""
      v-model="visible"
      width="30%"
      :before-close="newDocName = ''"
  >
    <div class="confirm">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <div style="height: 30px"></div>
          <header style="line-height: 30px;text-align: center; font-weight: bold;margin-bottom: 20px;">创建新文档</header>
          <div style="margin-left: 40px;margin-right: 50px;">
            <el-form  label-width="100px">
              <el-form-item label="文档名">
                <el-input v-model="newDocName" placeholder="文档名称" style=" !important;margin-left: 20px;margin-right: 0;"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" style="bottom: 30px; left: 100px; " @click="createClick"><span>确定</span></el-button>
            <el-button type="primary" style="bottom: 30px; right: 100px; " @click="visible=false"><span>取消</span></el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "createDocument",
  data() {
    return {
      visible: false,
      newDocName: '',
      userId: this.$store.state.loginUser.userId,

    }
  },
  emits: ['newCreated'],
  props: {
    proId: Number
  },
  methods: {
    createClick(){
      this.axios.post("document/create", {
        "name": this.newDocName,
        "creatorId": this.userId,
        "projectId" : this.proId,
      }).then(() => {
        this.$emit('newCreated');
      }).catch(err => {
        ElMessage({message: err.response.data.msg, type: 'warning'});
      })
    }
  }
}
</script>

<style scoped>

</style>