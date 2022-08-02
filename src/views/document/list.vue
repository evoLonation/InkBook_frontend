<template>
  <div><el-button @click="dialogVisible = true">创建文档</el-button></div>
  <div style="margin: 15px 0 5px 0;border-bottom: 1px solid #e8e8e8;padding-bottom: 10px">
  </div>
  <div style="height: 610px;">
    <el-table :data="tableData" stripe
              element-loading-text="少女折寿中"
              style="width:100%;margin-top: 0;"
              height="100%"
              :row-style="{height: '0'}"
              :cell-style="{padding: '20px'}"
              highlight-current-row
              @row-dblclick="dbClick"
              @cell-mouse-enter="recordId">
      <el-table-column sortable prop="docName" label="文件名" width="400"></el-table-column>
      <el-table-column sortable prop="createInfo" label="创建信息" width="350"></el-table-column>
    </el-table>
  </div>
<!--  <index v-if="menuVisible" @foo="foo" ref="contextButton" :spaceType="spaceType" :other="other"-->
<!--         @_export="_export" @share="showShare('默认文件名')" @edit="edit" @disCollect="disCollect"-->
<!--         data-popper-placement="top"></index>-->
  <el-dialog
      title=""
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
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
            <el-button type="primary" style="bottom: 30px; left: 100px; " @click="commit"><span>确定</span></el-button>
            <el-button type="primary" style="bottom: 30px; right: 100px; " @click="hide"><span>取消</span></el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {ref} from "vue";
import {ElMessage} from "element-plus";
export default {
  data() {
    return {
      dialogVisible: false,
      newDocName: '',
      tableData: [
        {
          docId: 0,
          docName: '金刚石需求文档',
          createInfo : '2022-8-2 14:32 by evoLonation',
          creatorId: 'giaoge',
        },
      ]
    }
  },
  setup() {
    const newFile = ref()
    function showNewFile() {
      newFile.value.show()
    }
    return {
      showNewFile,
      newFile,
    }
  },
  methods: {
    dbClick(row) {
      this.goEdit(row.docId)
    },
    goEdit(docId) {
      this.$router.push({
        name: "DocumentEdit",
        params: {
          docId: docId,
        }
      })
    },
    async sendCreateDoc() {
      let ret;
      await this.axios.post("document/create",{
        "name" : this.newDocName ,
        //todo get from store
        "creatorId" : "创建者id" ,
        "teamId" : "团队Id" ,
      }).then((res) => {
        if(res.status !== 200){
          ElMessage({message: res.data.msg, type: 'warning'});
        }else {
          ret = res.data.docId;
        }
      })
      return ret;
    },
    sendListDoc() {
      this.axios.get("document/list",{
        //todo get from store
        "projectId" : "",
      }).then((res) => {
        if(res.status !== 200){
          ElMessage({message: res.data.msg, type: 'warning'});
        }else {
          this.tabledata = res.data.docList;
        }
      })
    },
    async sendDeleteDoc(docId){
      let isSuccess = true;
      await this.axios.get("document/remove",{
        "dcoId" : docId,
      }).then((res) => {
        if(res.status !== 200){
          ElMessage({message: res.data.msg, type: 'warning'});
          isSuccess = false;
        }
      })
      return isSuccess;
    },
  }
}
</script>

<style scoped>

</style>