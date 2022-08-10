<template>
  <div style="display: flex;height: 50px; border-bottom: 1px dashed lightgrey">
    <span style="font-size: 15px;height: 15px;margin: auto 20px auto 20px;">页面：{{ this.graphName }}</span>
    <Collaboration :id="this.graphId" ref="Collaboration" type="uml"/>
    <!--    <el-button @click="this.toTemplate()">临时按钮：注册为模板</el-button>-->
  </div>
  <div class="wrap">
    <div class="content">
      <!--左侧工具栏-->
      <div id="stencil" class="sider" />
      <div class="panel">
        <!--流程图工具栏-->
        <div class="toolbar">
          <tool-bar v-if="isReady" :graphId="this.graphId" :graph-name="this.graphName"/>
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

import { defineComponent, ref } from "vue";
import '@/views/project/reset.less'
import '@/views/project/global.css'
import './index.less'
import FlowGraph from './graph'
import {Graph} from '@antv/x6'
import ToolBar from './components/ToolBar/index.vue'
import ConfigPanel from './components/ConfigPanel/index.vue'
import Collaboration from '@/components/Collaboration.vue'

const getContainerSize = () => {
  return {
    width: document.body.offsetWidth - 590,
    height: document.body.offsetHeight - 110,
  }
}
export default defineComponent({
  name: "index",
  props: ["graphId", "graphName"],
  components:{
    ToolBar,
    ConfigPanel,
    Collaboration
  },
  setup(){
    const isReady = ref(false)
    return{
      isReady,

    }
  },
  data(){
    return{
      graph: Graph
    }
  },
  mounted() {
    this.initGraph()
    console.log('即将调用一次start！！！！！！！！！！！')
    this.$refs.Collaboration.setSetter(this.setContent)
    this.$refs.Collaboration.setGetter(this.getContent)
    this.$refs.Collaboration.start()
    this.graph.on('cell:changed', () => {
      this.$refs.Collaboration.update()
    })
    this.graph.on('cell:added', () => {
      this.$refs.Collaboration.update()
    })
    this.graph.on('node:added', () => {
      this.$refs.Collaboration.update()
    })
    this.graph.on('node:change:*', () => {
      this.$refs.Collaboration.update()
    })
    this.graph.on('cell:removed', () => {
      this.$refs.Collaboration.update()
    })
    this.graph.on('node:removed', () => {
      this.$refs.Collaboration.update()
    })

  },
  methods: {
    setContent(data) {
      this.graph.fromJSON(data)
    },
    getContent(){
      return this.graph.toJSON().cells
    },
    initGraph(){
      this.graph = FlowGraph.init(this.graphId)
      this.isReady = true
      const resizeFn = () => {
        const { width, height } = getContainerSize()
        this.graph.resize(width, height)
      }
      resizeFn()
      window.addEventListener('resize', resizeFn)
      return () => {
        window.removeEventListener('resize', resizeFn)
      }

    }
  }
})
</script>

<style  lang="less" scoped>


</style>