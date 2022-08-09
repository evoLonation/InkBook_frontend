<template>
<div class="list-layout">
  <div
    class="prepare-for-el-table"
  >
    <div
      class="button-header"
    >
      <el-button
          class="document-add"
      >
        <el-icon><plus/></el-icon>&nbsp;新建文档&nbsp;
      </el-button>
    </div>
    <div
      class="my-el-table"
    >
      <el-table
          :data="docList"
          style="width: 100%; height: 100%"
          :header-row-style="{height: '70px'}"
          :row-style="{height: '50px'}"
      >
        <el-table-column
            prop="docName"
            label="文件名"
            width="300"
            class="my-el-table-column"
            sortable
        />
        <el-table-column
            prop="modifyInfo"
            label="修改信息"
            width="350"
            class="my-el-table-column"
            sortable
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small"
             @click="this.$refs.rename.open(scope.row.docId, 'doc')"
            >
              重命名
            </el-button>
            <el-button
                size="small"
                type="danger"

            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</div>
  <Rename v-model="renameVisible" ref="rename"/>
</template>

<script>
import {Plus} from "@element-plus/icons";
import Rename from "@/components/dialog/Rename";

import {ElMessage} from "element-plus";
export default {
  name: "documentEdit",
  components: {Plus, Rename},
  data(){
    return{
      docList: [
        {
          docId: 0,
          docName: '金刚石需求文档',
          modifyInfo : '2022-8-2 14:32 by evoLonation',
          modifierId: 'giaoge',
        },
      ],
      createVisible : false,
      renameVisible : false,
      projectId: this.$store.state.selectProject.proId,
    }
  },
  methods: {
    getListDocs() {
      this.axios.get('document/list', {
        params: {
          "projectId": this.projectId,
        }
      }).then((res) => {
        this.docList = res.data.docList;
      }).catch(err => {
        console.log(err)
        ElMessage({message: err.response.data.msg, type: 'warning'})
      })
    },
  },
  created() {
    this.getListDocs();
  }
}
</script>

<style scoped>
.list-layout {
  width: 100%;
  height: 55vh;
}

.document-add {
  width: 120px;
  height: 50px;
  color: white;
  border: none;
  float: right;
  margin-right: 7%;
  border-radius: 30px;
  background-color: royalblue;
}

.prepare-for-el-table {
  width: 100%;
  height: 55vh;
}

.button-header {
  width: 100%;
  height: 7vh;
}

.my-el-table {
  width: 100%;
  height: 44vh;
  border: 1px dashed lightgray;
  margin-top: 2%;
}
</style>