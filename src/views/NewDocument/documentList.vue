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
          :data="tableData"
          style="width: 100%; height: 100%"
          :header-row-style="{height: '70px'}"
          :row-style="{height: '50px'}"
      >
        <el-table-column
            prop="docName"
            label="文件名"
            width="400"
            class="my-el-table-column"
            sortable
        />
        <el-table-column
            prop="createInfo"
            label="修改信息"
            width="400"
            class="my-el-table-column"
            sortable
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small"
            >
              修改
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
</template>

<script>
import {Plus} from "@element-plus/icons";
export default {
  name: "documentEdit",
  components: {Plus},
  data(){
    return{
      tableData: [
        {
          docId: 0,
          docName: '金刚石需求文档',
          createInfo : '2022-8-2 14:32 by evoLonation',
          creatorId: 'giaoge',
        },
      ]
    }
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