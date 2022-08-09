<template >
  <div style="background-color: lightcyan; width: 100%;min-height: 100vh;margin-top: 0">
    <el-button round style="margin: 20px 120px;float: right;color: white;background-color: royalblue" @click="this.$router.push({name: 'protoList'})">退出预览</el-button>
    <div style="margin: 50px 100px 50px 100px;border-radius: 30px;box-shadow: 0 16px 32px rgb(0 0 0 / 8%);background-color: white">
      <div id="container1" class="x6-proto" style="display: inline-block;"/>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import '@/views/project/ProtoEdit/reset.less'
import '@/views/project/ProtoEdit/global.css'
import './index.less'
import {Graph} from '@antv/x6'
import axios from "axios";
import {ElMessage} from "element-plus/es";

export default {
  name: "Preview",

    setup(){
      const isReady = ref(false)
      return{
        isReady
      }
    },
  data(){
    return{
      protoId: Number,
      proto: Graph
    }
  },
    mounted() {
      this.protoId = this.$route.params.protoId
      console.log("id:", this.protoId)
      this.initGraph()
    },
    methods: {
      setContent(data) {
        console.log(data)
        this.proto.fromJSON(JSON.parse(data))
      },
      initGraph(){
        this.proto = new Graph({
          container: document.getElementById("container1"),
          width: 1000,
          height: 800,
          grid: false,

        });
        axios.get('proto/get', {
          params: {
            protoId: this.protoId
          }
        }).then((response) => {
            console.log(response.data.msg)
            this.setContent(response.data.content)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
}
</script>

<style lang="less" scoped>

</style>