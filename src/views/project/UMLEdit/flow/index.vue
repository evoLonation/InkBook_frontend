<template>
  <div class="wrap">
    <div class="content">
      <!--左侧工具栏-->
      <div id="stencil" class="sider" />
      <div class="panel">
        <!--流程图工具栏-->
        <div class="toolbar">
          <tool-bar v-if="isReady" />
        </div>
        <!--流程图画板-->
        <div id="container" class="x6-graph" />
      </div>
      <!--右侧工具栏-->
      <div class="config">
        <config-panel v-if="isReady"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted } from "vue";
import '@/reset.less'
import '@/global.css'
import './index.less'
import FlowGraph from './graph'
import ToolBar from './components/ToolBar/index.vue'
import ConfigPanel from './components/ConfigPanel/index.vue'

const getContainerSize = () => {
  return {
    width: document.body.offsetWidth - 590,
    height: document.body.offsetHeight - 110,
  }
}
export default defineComponent({
  name: "index",
  components:{
    ToolBar,
    ConfigPanel
  },
  setup(){
    const isReady = ref(false)
    const initGraph = function(): Function{
      const graph = FlowGraph.init()
      isReady.value = true
      const resizeFn = () => {
        const { width, height } = getContainerSize()
        graph.resize(width, height)
      }
      resizeFn()
      window.addEventListener('resize', resizeFn)
      return () => {
        window.removeEventListener('resize', resizeFn)
      }

    }
    onMounted(() => {
      initGraph()
    })
    return{
      isReady
    }
  }
})
</script>

<style  lang="less" scoped>


</style>
流程节点