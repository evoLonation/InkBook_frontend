<template>
  <div style="display: flex;height: 50px">
    <img src="@/assets/logo.png"/>
    <div style="margin: auto 0 auto 0"><h2>123</h2></div>
    <el-button  icon="Expand"  style="width: 50px;height: 40px" />
    <el-button  icon="Download"  style="width: 50px;height: 40px" />
    <div style="margin: auto 0 auto 0">
      <el-icon><Expand /></el-icon>
    </div>
    <div style="margin: auto 0 auto 0">
      <el-icon><Download /></el-icon>
    </div>
    <Collaboration :docId="docId" ref="collaboration"></Collaboration>
    <div style="margin: auto 0 auto auto"><h3>编辑人数：3</h3></div>

  </div>
</template>

<script>
import {Download} from "@element-plus/icons";
import Collaboration from "@/components/Collaboration"
export default {
  name: "editorTop",
  props: {
    docId: Number,
  },
  components: {Download, Collaboration},
  data() {
    return {
      funcs : undefined,
    }
  },
  mounted() {
    console.log("顶栏渲染完毕，hello：" + this.$refs.collaboration.hello())
  }
}
</script>

<style scoped>

</style>