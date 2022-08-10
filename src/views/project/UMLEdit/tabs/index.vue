<template>
<!--    <a-tabs-->
<!--        style="margin-top:0"-->
<!--        default-active-key="1"-->
<!--        tab-position="top"-->
<!--        :destroy-inactive-tab-pane="true"-->
<!--        size="small"-->
<!--        >-->
<!--      <a-tab-pane :key="graphId" :tab="graphName">-->
      <flow :graphId="graphId" :graphName="graphName"/>
<!--      </a-tab-pane>-->
<!--        <a-tab-pane :key="graph.graphId" :tab="graph.name" v-for="graph in this.graphList">-->
<!--          <flow :graphId="graph.graphId" :graphName="graph.name"/>-->
<!--        </a-tab-pane>-->
<!--    </a-tabs>-->
</template>

<script>
import flow from '../flow'

export default {
  name: "index",
  components:{
    flow,

  },
  data(){
    return {
      graphList: [],
      graphId: Number,
      graphName:'',
      projectId: Number,
    }
  },
 mounted() {
   this.projectId = this.$store.state.selectProject.proId
   this.graphName = this.$store.state.graph.graphName
   this.graphId = this.$store.state.graph.graphId
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
          this.graphList.remove
        }
        let i
        for(i in this.graphList){
          if (this.graphList[i].graphId === this.graphId){
            this.graphList.splice(i,1)
            break;
          }
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
