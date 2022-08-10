<template>
  <div class="config">
    <config-grid v-show="type === 'grid'" />
    <config-node v-show="type === 'node'" />
<!--    <config-text v-show="type === 'node'" />-->
    <config-edge v-show="type === 'edge'" />
<!--    <config-image v-show="type === 'image'" />-->
  </div>
</template>

<script lang="ts">
import ConfigGrid from './ConfigGrid/index.vue'
import ConfigNode from './ConfigNode/index.vue'
import ConfigEdge from './ConfigEdge/index.vue'
import ConfigImage from './ConfigImage/index.vue'
import FlowGraph from '@/views/project/ProtoEdit/flow/graph'
import './index.less'
import { defineComponent, ref, provide } from "vue";
import { globalGridAttr } from '@/views/project/ProtoEdit/flow/models/global'
import ConfigText from "@/views/project/ProtoEdit/flow/components/ConfigPanel/ConfigText/index.vue";

export default defineComponent({
  name: "index",
  components:{
    ConfigGrid,
    ConfigNode,
    // ConfigText,
    ConfigEdge,
    // ConfigImage
  },
  setup(){
    const type = ref("grid")
    const id = ref('')
    // 待优化
    const boundEvent = function(): void {
      const { graph } = FlowGraph
      graph.on('blank:click', () => {
        type.value = "grid"
      })
      graph.on('cell:click', ({ cell }) => {
        if(cell.isNode()){
          // if(cell.shape === 'zzy-image'){
          //   type.value = 'image';
          // }else{
            type.value = "node";
          // }
        }else{
          type.value = "edge";
        }

        id.value = cell.id
      })
    }
    boundEvent()
    provide('globalGridAttr',globalGridAttr)
    provide('id',id)

    return{
      type,
      id
    }
  }
})
</script>

<style lang="less" scoped>

</style>
