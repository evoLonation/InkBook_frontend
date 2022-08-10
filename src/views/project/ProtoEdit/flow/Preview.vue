<template >
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
  >
    <el-menu-item :index="proto" v-for="proto in this.protoList" :key="proto.protoId">{{proto.protoName}}</el-menu-item>
  </el-menu>
  <div style="width: 100%;min-height: 100vh;margin-top: 10px">
    <div style="margin-left: auto;margin-right:auto; min-width: 200px; max-width: 1500px; border-radius: 30px;box-shadow: 0 16px 32px rgb(0 0 0 / 8%);background-color: lightcyan; ">
      <div id="container1" class="x6-proto" style="display: inline-block;"/>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import '@/views/project/reset.less'
import '@/views/project/global.css'
import './index.less'
import {Graph} from '@antv/x6'
import axios from "axios";
import './graph/shape.ts'
import {ElMessage} from "element-plus";
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
      proto: Graph,
      activeIndex: '1',
      activeIndex2: '1',
      protoList: [],
    }
  },
    mounted() {
      this.getProtoList()
      this.protoId = this.$route.params.protoId
      console.log("id:", this.protoId)
      this.initGraph()
    },
    methods: {
      getProtoList(){
        this.$axios.get('/prototype/list-preview', {
          params: {
            protoId: this.protoId,
            projectId: this.$route.params.projectId
          }
        }).then(res=>{
          this.protoList = res.data.previewList
          console.log(this.protoList)
        }).catch(err=>{
          console.log(err)
        })
      },
      handleSelect(key, keyPath) {
        console.log('content',key.content)
        this.$axios.get('/prototype/get-preview',{
          params: {
            'protoId': key.protoId
          }
        }).then(res=>{
          console.log(res.data.msg)
          if (res.data.type === 'close')
            ElMessage('该页面预览已关闭')
          else
            this.setContent(JSON.parse(key.content))
        })
      },
      setContent(data) {
        console.log('data',data)
        this.proto.fromJSON(data)
      },
      initGraph(){
        this.proto = new Graph({
          container: document.getElementById("container1"),
          width: 1000,
          height: 800,
          grid: false,
        });
        axios.get('prototype/get', {
          params: {
            protoId: this.protoId
          }
        }).then((response) => {
            console.log('res',response.data.content)
            this.setContent(JSON.parse(response.data.content))
        }).catch((err) => {
          console.log(err)
        })
      }
    }
}
</script>

<style lang="less" scoped>

</style>