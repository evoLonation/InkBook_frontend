<template>
  <div class="alert-box-item">
    <div class="bigImg-div" @click="toGetImg">
      <img class="bigImg" :src=valueUrl v-if="valueUrl">
    </div>
  </div>
</template>

<script>
let inputElement = null
export default {
  data() {
    return {
      valueUrl: ''
    }
  },
  methods: {
    toGetImg() {
      if (inputElement === null) {
        // 生成文件上传的控件
        inputElement = document.createElement('input')
        inputElement.setAttribute('type', 'file')
        inputElement.style.display = 'none'

        if (window.addEventListener) {
          inputElement.addEventListener('change', this.uploadFile, false)
        } else {
          inputElement.attachEvent('onchange', this.uploadFile)
        }

        document.body.appendChild(inputElement)
      }
      inputElement.click()
    },
    uploadFile(el) {
      if (el && el.target && el.target.files && el.target.files.length > 0) {
        console.log(el)
        const files = el.target.files[0]

        const that = this;
        const reader = new FileReader(); // 创建读取文件对象
        reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
        reader.onload = function () { // 文件读取完成后
          // 读取完成后，将结果赋值给img的src
          that.valueUrl = this.result;
          console.log(this.result);
          // 数据传到后台
          //const formData = new FormData()
          //formData.append('file', files); // 可以传到后台的数据
          };

      }
    }
  },
}
</script>

<style scoped>
.alert-box-item {
  overflow: hidden;
}

.bigImg-div {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.bigImg {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
</style>