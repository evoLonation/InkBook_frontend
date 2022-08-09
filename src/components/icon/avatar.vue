<template>
  <img v-if="flag === 0" src="../../assets/icon/icon1.png" style="height: 40px; width: 40px">
</template>

<script>
export default {
  name: "avatar",
  data() {
    return {
      flag: 0
    }
  }
}
</script>

<style scoped>

</style>