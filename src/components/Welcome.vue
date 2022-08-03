<template>
  <section>
    <header>
      <router-link to="#" class="logo"><img src="../assets/logo.png" style="width: 80px; height: 80px"> </router-link>
      <ul>
        <li><router-link to="#">aaa</router-link></li>
        <li><router-link to="#">bbb</router-link></li>
        <li><router-link to="#">ccc</router-link></li>
        <li><router-link to="#">ddd</router-link></li>
      </ul>
    </header>

    <section class="global-banner" :style="{'background-image': `url(${require('../assets/bk.jpg')})`}">
      <div class="banner-inner">
        <h1 class="banner-title1">编不出来了！！ </h1>
        <h2 class="banner-title2">全能设计协作平台，产品经理用 墨书，UI设计师用 墨书</h2>
        <h2 class="banner-title2">全能设计协作平台，产品经理用 墨书，<br>UI设计师用 墨书</h2>
        <router-link to="/login" class="banner-btn" >加入我们</router-link>
      </div>
      <el-icon size="100px"><ArrowDownBold /></el-icon>
    </section>

    <div class="feature">
      <h2 class="home-title">我的设计利器，团队的协作平台</h2>

      <div class="feature-content">
        <div class="feature-item">
          <img src="../assets/icon1.png" style="width: 100px; height: 100px; margin-left: 100px">
          <h3>快速原型设计</h3>
          <p>海量组件图标，丰富交互动效 <br>用墨书，快速实现创意落地</p>
        </div>

        <div class="feature-item">
          <img src="../assets/icon2.png" style="width: 100px; height: 100px; margin-left: 100px">
          <h3>专业UI设计</h3>
          <p>矢量编辑、协同设计、资源复用 <br>用墨书，轻松搞定设计创作</p>
        </div>

        <div class="feature-item">
          <img src="../assets/icon3.png" style="width: 100px; height: 100px; margin-left: 100px">
          <h3>高效协同工作</h3>
          <p>从产品、设计到开发，全流程协作 <br>用墨书，提升团队协作效能</p>
        </div>

        <div class="feature-item">
          <img src="../assets/icon4.png" style="width: 100px; height: 100px; margin-left: 100px">
          <h3>设计规范管理</h3>
          <p>轻松定制规范，高效管理资源 <br>用墨书，发挥设计资源价值</p>
        </div>

      </div>
    </div>
    <div class="content1">
      <div class="textBox">
        <h2>项目协作设计<br><span>更快更简单</span></h2>
        <p>更好的项目协作开发平台，设计师的利器，项目经理的帮手，工程师的伙伴</p>
        <router-link to="/login">加入我们</router-link>
      </div>
      <div class="imgBox">
        <img src="../assets/logo.png" class="img1" style="width: 300px">
      </div>
    </div>

    <div class="content2">
      <div class="imgBox">
        <img src="../assets/logo.png" class="img1" style="width: 300px">
      </div>
      <div class="textBox">
        <h2>轻松上手<br><span>快速设计</span></h2>
        <p>简洁易懂的界面，丰富的素材，人人可上手，助力快速完成产品设计</p>
        <router-link to="/login">加入我们</router-link>
      </div>
    </div>

    <div class="content3">
      <div class="textBox">
        <h2>项目协作设计<br><span>更快更简单</span></h2>
        <p>更好的项目协作开发平台，设计师的利器，项目经理的帮手，工程师的伙伴</p>
        <router-link to="/login">加入我们</router-link>
      </div>
      <div class="imgBox">
        <img src="../assets/logo.png" class="img1" style="width: 300px">
      </div>
    </div>

    <div class="content4">
      <div class="imgBox">
        <img src="../assets/logo.png" class="img1" style="width: 300px">
      </div>
      <div class="textBox">
        <h2>轻松上手<br><span>快速设计</span></h2>
        <p>简洁易懂的界面，丰富的素材，人人可上手，助力快速完成产品设计</p>
        <router-link to="/login">加入我们</router-link>
      </div>
    </div>

    <div class="content-red">
      <h5>我们都在用墨书创造设计动力</h5>
      <h6>你和你的团队也可以</h6>
      <router-link class="footer-bt" to="/login">加入我们</router-link>
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
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
  }
  section {
    position: absolute;
    width: 100%;
    padding: 100px 0;
    display: flex;
    flex-direction: column;
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
    padding: 10px 100px 0;
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
  .global-banner {
    width: 100%;
    height: 87vh;
    min-height: 620px;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 0;
  }
  .global-banner .banner-inner {
    position: absolute;
    z-index: 2;
    width: 100%;
    left: 0;
    padding: 0 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    top: 50%;
    color: #ffffff;
    text-align: center;
    margin-top: -110px;
  }
  .global-banner .banner-inner .banner-title1 {
    font-size: 38px;
    color: #ffffff;
    line-height: 1.5;
    letter-spacing: 0;
    margin-bottom: 16px;
    font-weight: 600;
  }
  .global-banner .banner-inner .banner-title2 {
    font-size: 18px;
    line-height: 1.6;
    letter-spacing: 0;
    font-weight: 400;
    margin: 0;
  }
  .banner-btn, .footer-bt {
    width: 240px;
    margin: 72px auto 0;
    line-height: 56px;
    height: 56px;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    color: #ffffff;
    background-color: #fe4066;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
    text-decoration: none;
  }
  .feature {
    width: 100%;
  }
  .feature .home-title {
    font-size: 28px;
    line-height: 128%;
    color: #000000;
    text-align: center;
    padding: 140px 15px 0;
    font-weight: 600;
  }
  .feature .feature-content {
    margin: 80px auto 0;
    overflow: hidden;
    max-width: 1300px;
    width: 92%;
    display: flex;
    justify-content: space-between;
  }
  .feature .feature-content .feature-item {
    width: 100%;
    vertical-align: top;
    padding: 0 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .feature .feature-content .feature-item h3 {
    text-align: center;
    font-size: 24px;
    line-height: 150%;
    margin: 38px 0 4px;
    font-weight: 600;
    letter-spacing: 2px;

  }
  .feature .feature-content .feature-item p {
    text-align: center;
    max-width: 310px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 175%;
    color: #8c8889;
  }
  .content1 {
    position: relative;
    padding: 144px 120px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content1 .textBox, .content2 .textBox, .content3 .textBox, .content4 .textBox {
    position: relative;
    max-width: 600px;
  }
  .content1 .textBox h2, .content2 .textBox h2, .content3 .textBox h2, .content4 .textBox h2 {
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
  .content2 .textBox h2 span {
    color: #4c84ff;
    font-size: 1.2em;
    font-weight: 900;
  }
  .content3 .textBox h2 span {
    color: darkgreen;
    font-size: 1.2em;
    font-weight: 900;
  }
  .content4 .textBox h2 span {
    color: magenta;
    font-size: 1.2em;
    font-weight: 900;
  }
  .content1 .textBox p, .content2 .textBox p, .content3 .textBox p, .content4 .textBox p {
    color: #333;
  }
  .content1 .textBox a, .content2 .textBox a, .content3 .textBox a, .content4 .textBox a {
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
  .content1 .imgBox, .content3 .imgBox {
    width: 600px;
    display: flex;
    justify-content: flex-end;
    padding-right: 50px;
    margin-top: 50px;
  }
  .content2 .imgBox, .content4 .imgBox {
    width: 600px;
    display: flex;
    justify-content: flex-start;
    padding-right: 50px;
    margin-top: 50px;
  }
  .content2, .content3, .content4{
    position: relative;
    padding: 50px 120px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content-red {
    width: 100%;
    padding: 129px 0;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: violet;
  }
  .content-red h5 {
    font-size: 48px;
    line-height: 1.5;
    color: #ffffff;
    font-weight: 600;
    margin: 0 0 20px;
  }
  .content-red h6 {
    font-size: 20px;
    line-height: 100%;
    color: #ffffff;
    font-weight: 400;
    margin: 0;
  }
</style>