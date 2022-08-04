<template>
  <div></div>
</template>

<script>
export default {
  name: "BlockSearch",
  data (){
    return{

    }
  },
  created() {
    this.$router.push({name: "teamList", params: {key: this.$route.params.key}})
  }
}
</script>

<style scoped>

</style>