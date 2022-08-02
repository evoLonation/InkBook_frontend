<template>
  <section>
    <header>
      <router-link to="#" class="logo"><img src="../assets/logo.png"> </router-link>
      <ul>
        <li><router-link to="#">aaa</router-link></li>
        <li><router-link to="#">bbb</router-link></li>
        <li><router-link to="#">ccc</router-link></li>
        <li><router-link to="#">ddd</router-link></li>
      </ul>
    </header>

    <div class="content1">
      <div class="textBox">
        <h2>项目协作设计<br><span>更快更简单</span></h2>
        <p>更好的项目协作开发平台，设计师的利器，项目经理的帮手，工程师的伙伴</p>
        <router-link to="#">加入我们</router-link>
      </div>
    </div>
    <div class="imgBox">
      <img src="../assets/logo.png" class="img1">
    </div>
  </section>
</template>

<script>
export default {
  name: "Welcome"
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  section {
    position: relative;
    width: 100%;
    padding: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
  }
  header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  header .logo {
    position: relative;
    max-width: 80px;
  }
  header ul {
    position: relative;
    display: flex;
  }
  header ul li {
    list-style: none;
  }
  header ul li a {
    display: inline-block;
    color: #333;
    font-weight: 400;
    margin-left: 40px;
    text-decoration: none;
  }
</style>