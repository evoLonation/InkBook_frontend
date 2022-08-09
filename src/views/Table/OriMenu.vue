<template>
  <el-button type="primary" style="margin-left: 16px" @click="table = true">
    open
  </el-button>

  <el-drawer  v-model="table" direction="rtl"
              size="35%">

    <el-row>
      <el-col
          v-for="(o, index) in 5"
          :key="o"
          :span="10"
          :offset="index % 2 ? 2 : 0"
      >
        <el-card >
          <img
              src="../../assets/logo1.png"
              class="image"
              style="height: 100px; width: 100px; margin-left: 25px;"
          />
          <div style=" text-align: center">
            <span style="padding: 0">原型名称</span>
          </div>
        </el-card>
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