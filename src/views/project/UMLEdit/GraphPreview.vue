<template>
  <div id="container1" class="x6-graph" style="display: inline-block;"/>
</template>

<script lang="ts">
import { ref } from "vue";
import '@/views/project/reset.less'
import '@/views/project/global.css'
import './flow/index.less'
import {Graph} from '@antv/x6'
import axios from "axios";
export default {
  name: "GraphPreview",
  props: ["graphId", "graphName"],
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
          console.log(response.data.msg)
          this.setContent(response.data.content)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>