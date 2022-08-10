<template >
  <div style="width: 100%;min-height: 100vh;margin-top: 0">
    <div style="margin-left: auto;margin-right:auto; min-width: 200px; max-width: 800px; border-radius: 30px;box-shadow: 0 16px 32px rgb(0 0 0 / 8%);background-color: lightcyan; ">
      <el-button round style="margin-left: 10%;margin-right:auto; margin-top:20px;color: white;background-color: royalblue" @click="this.quit()">退出预览</el-button>
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
      quit(){
        axios.post('/prototype/set-preview',{
          'protoId': this.protoId,
          'type': 'close',
        }).then(res=>{
          console.log(res.data.msg)
        }).catch(err=>{
          console.log(err)
        })
        this.$router.push({name: 'proto'})
      },
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
        axios.get('prototype/get', {
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