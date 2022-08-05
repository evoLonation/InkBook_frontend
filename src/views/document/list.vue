<template>
  <div style="position: absolute;top: 120px;z-index: 9;width: 100%;background-color: white; ">
    <div style="width: 90%; display: flex">
      <div style="margin: 20px 50px 20px auto; width: 100px;">
        <el-button
            type="success"
            @click="dialogVisible = true"
            style="width: 100px;"
        >
          创建文档
        </el-button>
      </div>

    </div>
    <div style="margin: 15px 0 5px 0;border-bottom: 1px solid #e8e8e8;padding-bottom: 10px">
    </div>
    <div style="height: 730px">
      <el-table :data="tableData" stripe
                element-loading-text="少女折寿中"
                style="width:100%; margin-top: 0;"
                height="100%"
                :row-style="{height: '0'}"
                :cell-style="{padding: '20px'}"
                :header-cell-style="{padding: '20px'}"
                highlight-current-row
                @row-dblclick="dbClick">
        <el-table-column sortable prop="docName" label="文件名" width="800" style="padding: 20px"></el-table-column>
        <el-table-column sortable prop="modifyInfo" label="修改信息" width="450" style="padding: 20px"></el-table-column>
        <el-table-column width="100" label="">
          <template #default="scope">
            <!--          <el-button text>-->
            <el-popconfirm
                confirmButtonText="确定"
                cancelButtonText="取消"
                icon="el-icon-info"
                iconColor="red"
                title="确定删除该项目吗？"
                @confirm="sendDeleteDoc(scope.row.docId);sendListDoc()">
              <template #reference>
                <el-icon style="color: #c45656"><Delete /></el-icon>
              </template>
            </el-popconfirm>
            <!--          </el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

<!--  <index v-if="menuVisible" @foo="foo" ref="contextButton" :spaceType="spaceType" :other="other"-->
<!--         @_export="_export" @share="showShare('默认文件名')" @edit="edit" @disCollect="disCollect"-->
<!--         data.js-popper-placement="top"></index>-->
  <el-dialog
      title=""
      v-model="dialogVisible"
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
            <el-button type="primary" style="bottom: 30px; right: 100px; " @click="dialogVisible=false"><span>取消</span></el-button>
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
    createClick() {
      this.sendCreateDoc().then(docId => {
        this.goEdit(docId)
      })

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
      await this.axios.post("document/create", {
        "name": this.newDocName,
        "creatorId": this.$store.state.loginUser.userId,
        "projectId": this.$store.state.selectProject.proId,
      }).then((res) => {
        if (res.status !== 200) {
          ElMessage({message: res.data.msg, type: 'warning'});
        } else {
          ret = res.data.docId;
        }
      }).catch(err => {
        ElMessage({message: err.response.data.msg, type: 'warning'});
      })
      console.log('new doc has create, id is ' + ret)
      return ret;
    },
    sendListDoc() {
      this.axios.get("document/list",{
        params:{
          "projectId" : this.$store.state.selectProject.proId,
        }
      }).then((res) => {
        this.tableData = res.data.docList;
      }).catch(err => {
        ElMessage({message: err.response.data.msg, type: 'warning'});
      })
    },
    sendDeleteDoc(docId){
      console.log('will delete docId is ' + docId)
      this.axios.post("document/complete-delete",{
        "docId" : docId,
      }).then((res) => {
        ElMessage({message: '删除文档成功', type: 'success'});
      }).catch(err => {
        console.log(err.response)
        ElMessage({message: err.response.data.msg, type: 'warning'});
      })
    },
  },
  mounted() {
    this.sendListDoc()
  }
}
</script>

<style scoped>

</style>