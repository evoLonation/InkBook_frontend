<template>
<!--  <body>-->
<!--  <div id="qqq">-->
<!--    <div id="qrCode" ref="qrCodeDiv"></div>-->
<!--  </div>-->
<!--  </body>-->
<!--  <el-dialog-->
<!--      title="弹窗"-->
<!--      v-model:visible="detailVisible"-->
<!--      width="35%"-->
<!--  >-->
    <div id="qrCode"
         class="qrconde"
         ref="qrCodeDiv"
         style="width: 200px;
         height: 200px">
    </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas'

export default {
  name: "TestQrcode",
  data() {
    return {
      detailVisible: false,
      teamId: -1
    }
  },
  methods: {
    // init: function (){
    //   this.detailVisible = true;
    // },
    bindQRCode () {
      new QRCode(this.$refs.qrCodeDiv, {
        text: 'http://43.138.71.108/#/team/invite/' + this.teamId,
        width: 200,
        height: 200,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L// 容错率，L/M/H
      });
      // 下载二维码
      this.createPicture();
      // 向后回退一个网页
      this.$router.go(-1);
    },
    createPicture () {
      html2canvas(this.$refs.qrCodeDiv, {
        backgroundColor: null,
        width: 200,
        height: 200
      }).then(canvas => {
        let link = document.createElement('a');
        link.href = canvas.toDataURL();
        console.log(link.href);
        link.setAttribute('download', 'welcome.png');
        link.style.disabled = 'none';
        document.body.appendChild(link);
        link.click();
      })
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.bindQRCode()
    })
  },
  created() {
    this.teamId = this.$route.params.teamId;
  }
}
</script>

<style lang="less">
#qqq {
  background-color: #111;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  position: relative;
}

#qrCode {
  display: inline-block;
  margin: 0 auto;
  position: relative;
  top: 15%;

  img {
    width: 200px;
    height: 200px;
    background-color: #fff;
    padding: 6px;
  }
}
</style>