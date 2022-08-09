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
            <el-icon><Document /></el-icon>
            <span>uml1</span>
          </el-menu-item>

          <el-menu-item index="2" >
            <el-icon><Document /></el-icon>
            <span>uml2</span>
          </el-menu-item>

          <el-menu-item index="3">
            <el-icon><Document /></el-icon>
            <span>uml3</span>
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