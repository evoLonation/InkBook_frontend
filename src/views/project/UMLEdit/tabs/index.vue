<template>
  <div>
    <a-tabs
        style="margin-top:0"
        default-active-key="flow"
        tab-position="top"
        :destroy-inactive-tab-pane="true"
        size="small"
        v-for="graph in this.graphList"
        :key="graph">
        <a-tab-pane key="flow" :tab="graph.name" >
          <flow :graphId="graph.graphId"/>
        </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import flow from '../flow'

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
      graphId: Number,
      projectId: Number,
    }
  },
  mounted() {
    this.graphId = this.$route.params.graphId
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
          this.graphList = res.data.graphList;
        }
      }
    }).catch(err=>{
      console.log(err);
    })
  }
}
</script>

<style scoped>

</style>
