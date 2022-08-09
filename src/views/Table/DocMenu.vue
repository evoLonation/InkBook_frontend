<template>
  <el-button type="primary" style="margin-left: 16px" @click="table = true">
    open
  </el-button>

  <el-drawer  v-model="table" direction="rtl"
              size="35%">

    <el-row class="tac">
      <el-col :span="12">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            style="width: 490px; height: 82vh"
        >

          <el-menu-item index="1">
            <el-icon><ChatLineRound /></el-icon>
            <span>部门介绍</span>
          </el-menu-item>

          <el-menu-item index="2" >
            <el-icon><Folder /></el-icon>
            <span>其他文件夹</span>
          </el-menu-item>

          <el-menu-item index="3">
            <el-icon><setting /></el-icon>
            <span>数据</span>
          </el-menu-item>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><Folder /></el-icon>
              <span>项目文档区</span>
            </template>
            <el-sub-menu index="1-1">
              <template #title>
                <el-icon><Folder /></el-icon>
                项目1
              </template>

              <el-menu-item index="1-4-1">
                <el-icon><Tickets /></el-icon>
                项目1文档
              </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="1-2">
              <template #title>
                <el-icon><Folder /></el-icon>
                项目2
              </template>
              <el-menu-item index="1-4-1">
                <el-icon><Tickets /></el-icon>
                项目2文档
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <el-menu-item index="5">
            <el-icon><setting /></el-icon>
            <span>支持服务中心</span>
          </el-menu-item>

          <el-menu-item index="6">
            <el-icon><Tickets /></el-icon>
            <span>团队介绍</span>
          </el-menu-item>

          <el-menu-item index="7">
            <el-icon><Back /></el-icon>
            <span>团队介绍</span>
          </el-menu-item>

        </el-menu>
      </el-col>
    </el-row>
  </el-drawer>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
const table = ref(false)
</script>

<style scoped>

</style>