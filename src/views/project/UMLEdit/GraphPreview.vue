<template>
  <div id="container1" class="x6-graph" style="display: inline-block;"/>
</template>

<script lang="ts">
import { ref } from "vue";
import '@/views/project/reset.less'
import '@/views/project/global.css'
import './flow/index.less'
import {Graph} from '@antv/x6'
import '../ProtoEdit/flow/graph/shape.ts'
import axios from "axios";
import FlowGraph from "@/views/project/ProtoEdit/flow/graph";

export default {
  name: "GraphPreview",
  props: ["content"],
  setup(){
    const isReady = ref(false)
    return{
      isReady
    }
  },
  data(){
    return{
      graph: Graph
    }
  },
  mounted() {
    console.log('in mounted!!!!!!!!')
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
      this.graph.fromJSON(JSON.parse(this.content))
    }
  },
  watch: {
    content(newValue, oldValue) {
      console.log('watched')
      this.graph.fromJSON(JSON.parse(newValue))
    }
  }
}
</script>

<style scoped>

</style>