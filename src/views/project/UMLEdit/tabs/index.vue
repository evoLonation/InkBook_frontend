<template>
    <a-tabs
        style="margin-top:0"
        default-active-key="1"
        tab-position="top"
        :destroy-inactive-tab-pane="true"
        size="small"
        >
        <a-tab-pane :key="graph.graphId" :tab="graph.name" v-for="graph in this.graphList">
          <flow :graphId="graph.graphId" :graphName="graph.name"/>
        </a-tab-pane>
    </a-tabs>
</template>

<script>
import flow from '../flow'
import {ElMessage} from "element-plus";

export default {
  name: "index",
  components:{
    flow,

  },
  setup() {
    const classType = "class"
    const activityType = "activity"
    return {
      classType,
      activityType,
    }
  },
  data(){
    return {
      graphList: [],
      graphList2: [],
      graphId: Number,
      graphName:'',
      projectId: Number,
    }
  },
  mounted() {
    this.graphId = this.$route.params.graphId
    this.graphName = this.$route.params.graphName
    this.projectId = this.$route.params.projectId
    console.log(this.graphId, this.projectId)
    this.$axios.get("graph/list", {
      params:{
        projectId: this.projectId
      }
    }).then(res=>{
      if(res.status === 200){
        console.log(res.data)
        if(res.data.graphList.length !== 0) {
          this.graphList2 = res.data.graphList;
        }
      }
    }).catch(err=>{
      console.log(err);
    })
    let graph
    for(graph in this.graphList2){
      if (graph.graphId === this.graphId){
        continue
      }
      this.graphList.push(graph)
    }
    this.graphList.push({
      graphId: this.graphId,
      name: this.graphName
    })
    console.log(this.graphList)
  }
}
</script>

<style scoped>

</style>
