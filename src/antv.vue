<template>
  <div id="container"></div>
  <my-giao/>
</template>

<script>
import { Graph } from '@antv/x6';
import '@antv/x6-vue-shape';
import {onMounted} from "vue";
import MyGiao from "./MyGiao"
import { ElButton } from 'element-plus';
export default {
  components: {MyGiao},
  setup() {
    const initGraph = () => {
      const graph = new Graph({
        container: document.getElementById("container"),
        width: 600,
        height: 400,
        grid: true,
      });
      Graph.registerNode("giao", {
        inherit: "vue-shape",
        x: 200,
        y: 150,
        width: 150,
        height: 100,
        component: {
          template: `<my-giao />`,
          components: {MyGiao},
        },
      });
      Graph.registerNode("button", {
        inherit: "vue-shape",
        x: 100,
        y: 150,
        width: 150,
        height: 100,
        component: {
          template: `<el-button>asdfasdghg</el-button>`,
          components: {ElButton},
        },
      });
      graph.addNode({
        id: "1",
        shape: "giao",
        x: 400,
        y: 150,
        width: 150,
        height: 100,
        data: {
          num: 0,
        },
      });
      graph.addNode({
        id: "2",
        shape: "button",
        x: 300,
        y: 150,
        width: 150,
        height: 100,
        data: {
          num: 0,
        },
      });
    };


    onMounted(() => {
      initGraph();
    })


  }
}
</script>

<style scoped>

</style>