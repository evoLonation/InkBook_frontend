<template>
  <a-tabs
      style="margin-top:0"
      default-active-key="1"
      tab-position="top"
      :destroy-inactive-tab-pane="true"
      size="small"
  >
    <a-tab-pane :key="protoId" :tab="protoName">
      <flow :graphId="protoId" :graphName="protoName"/>
    </a-tab-pane>
    <a-tab-pane :key="graph.protoId" :tab="graph.protoName" v-for="graph in this.graphList">
      <flow :graphId="graph.protoId" :graphName="graph.protoName"/>
    </a-tab-pane>
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
      protoId: Number,
      projectId: Number,
      protoName: '',
    }
  },
  mounted() {
    this.protoId = this.$route.params.protoId
    this.protoName = this.$route.params.protoName
    this.projectId = this.$route.params.projectId
    this.$axios.get("prototype/list", {
      params: {
        projectId: this.projectId
      }
    }).then(res => {
      if (res.status === 200) {
        this.graphList = res.data.protoList;
        let i
        for (i in this.graphList) {
          if (this.graphList[i].protoId.toString() === this.protoId) {
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
