<template>
  <section>
    <header>
      <router-link to="#" class="logo"><img src="../assets/logo.png" style="width: 100px"> </router-link>
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
      <div class="imgBox">
        <img src="../assets/logo.png" class="img1" style="width: 300px">
      </div>
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
    margin: 0;
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
    background-color: pink;
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
  .content1 {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content1 .textBox {
    position: relative;
    max-width: 600px;
  }
  .content1 .textBox h2 {
    color: #333;
    font-size: 4em;
    line-height: 1.4em;
    font-weight: 500;
  }
  .content1 .textBox h2 span {
    color: firebrick;
    font-size: 1.2em;
    font-weight: 900;
  }
  .content1 .textBox p {
    color: #333;
  }
  .content1 .textBox a {
    display: inline-block;
    margin-top: 20px;
    padding: 8px 20px;
    background: #42b983;
    color: #fff;
    border-radius: 40px;
    font-weight: 500;
    letter-spacing: 1px;
    text-decoration: none;
  }
  .content1 .imgBox {
    width: 600px;
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;
    margin-top: 50px;
  }
</style>