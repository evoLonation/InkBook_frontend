<template>
  <el-button round style="margin: 20px 120px;float: right" >退出预览</el-button>
  <div style="margin: 50px 100px 50px 100px;background-color: lightcyan;border-radius: 30px">
    <div id="container1" class="x6-graph" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import '@/views/project/UMLEdit/reset.less'
import '@/views/project/UMLEdit/global.css'
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
      graphId: Number,
      graph: Graph
    }
  },
    mounted() {
      this.graphId = this.$route.params.graphId
      console.log("id:", this.graphId)
      this.initGraph()
    },
    methods: {
      setContent(data) {
        console.log(data)
        this.graph.fromJSON(JSON.parse(data))
      },
      initGraph(){
        this.graph = new Graph({
          container: document.getElementById("container1"),
          width: 1000,
          height: 800,
          grid: false,

        });
        axios.get('graph/get', {
          params: {
            graphId: this.graphId
          }
        }).then((response) => {
          if (response.status === 409){
            ElMessage('当前图正在被编辑！')
            this.$router.push({name: "TopTable"})
          }
          else {
            console.log(response.data.msg)
            this.setContent(response.data.content)
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
}
</script>

<style lang="less" scoped>

</style>