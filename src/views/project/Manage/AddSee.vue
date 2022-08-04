<template>
  <div
    style="width: 100%; height: 80px; border-bottom: 1px solid lightgray; position: fixed; top: 130px; z-index: 10"
  >
    <el-button
        style="width: 100px; margin: 20px 50px auto 1410px"
        type="success"
    >
      添加项目
    </el-button>
  </div>
  <el-row
      style="z-index: 2; float: left; top: -550px; bottom: -550px"
  >
    <div
        v-for="o in 10"
        :key="o"
    >
      <el-card
          :body-style="{ padding: '0px' }"
          style="width: 250px; height: 350px; margin: 30px 30px 30px 30px"
      >
<!--        <img-->
<!--            src="../../assets/Project/UML图布局.jpeg"-->
<!--            class="image"-->
<!--            style="height: 260px; object-fit: cover"-->
<!--            alt=""-->
<!--        />-->
        <img
            src="../../../assets/Project/设计原型.jpeg"
            class="image"
            style="height: 260px; object-fit: cover"
            alt=""
        />
        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <el-dropdown style="width: 100px">
              <span class="el-dropdown-link">
                操作
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                      style="color: #409EFF"
                      @click="this.$message.success('您的文件已经修改！')"
                  >
                    修改文件
                  </el-dropdown-item>
                  <el-dropdown-item
                      style="color: #F56C6C"
                      @click="this.$message.error('您的文件已经删除')"
                  >
                    删除文件
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-card>
    </div>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentDate = ref(new Date())
</script>

<style>
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
