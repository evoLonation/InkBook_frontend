<template>
  <a-tabs
      style="margin-top:0"
      default-active-key="1"
      tab-position="top"
      :destroy-inactive-tab-pane="true"
      size="small"
  >
    <a-tab-pane :key="this.protoId" :tab="this.protoName">
      <flow :graphId="this.protoId" :graphName="this.protoName"/>
    </a-tab-pane>
<!--    <a-tab-pane :key="graph.protoId" :tab="graph.protoName" v-for="graph in this.graphList">-->
<!--      <flow :graphId="graph.protoId" :graphName="graph.protoName"/>-->
<!--    </a-tab-pane>-->
  </a-tabs>
</template>

<script>
import flow from '../flow'

export default {
  name: "index",
  components: {
    flow,

  },
  data() {
    return {
      graphList: [],
      protoId: null,
      projectId: null,
      protoName: '',
    }
  },
  mounted() {
    console.log('load')
    this.projectId = this.$store.state.selectProject.proId
    this.protoName = this.$store.state.proto.protoName
    this.protoId = this.$store.state.proto.protoId
    this.$axios.get("prototype/list", {
      params: {
        projectId: this.projectId
      }
    }).then(res => {
      if (res.status === 200) {
        this.graphList = res.data.protoList;
        let i
        for (i in this.graphList) {
          if (this.graphList[i].protoId === this.protoId) {
            this.graphList.splice(i, 1)
            break;
          }
        }
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>

</style>
