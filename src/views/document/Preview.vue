<template>
  <div >
<!--    <Toolbar-->
<!--        id="editor-toolbar"-->
<!--        style="border-bottom: 1px solid #ccc"-->
<!--        :editor="editorRef"-->
<!--        :defaultConfig="toolbarConfig"-->
<!--        :mode="mode"-->
<!--    />-->
  </div>
  <div id="content">
    <div id="editor-container">
      <div id="title-container">
        <input v-model="title" disabled>
      </div>
      <Editor
          id = "editor-text-area"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
      />
    </div>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, ref, shallowRef, provide, onMounted} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from "axios";
import {ElMessage} from "element-plus";
import {useRoute, } from "vue-router/dist/vue-router";
import {useStore} from "vuex";

export default {
  components: { Editor},
  data(){
    return {
    };
  },
  props: {
    content : String,
    title: String,
  },
  watch: {
    content(newContent, oldContent) {
      this.setContent(JSON.parse(newContent));
    }
  },
  setup() {

    /**
     * 编辑器初始化与销毁相关操作
     * @type {ShallowRef<any>}
     */
    // 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。
    const editorRef = shallowRef()

    // 组件销毁时，也及时销毁编辑器
    const destroyEditor =  () => {
      const editor = editorRef.value;
      if (editor == null) return
      editor.destroy()
    }
    const mode = ref('default')
    const toolbarConfig = {
      excludeKeys: 'fullScreen',
    }
    const editorConfig = {
      scroll: false, // 禁止编辑器滚动
      readonly: true,
    }


    const handleCreated = (editor) => {
      console.log("编辑器创建成功");
      editorRef.value = editor // 记录 editor 实例，重要！
      console.log(editorRef.value.children)
      editorRef.value.disable();
    };


    onBeforeUnmount(() => {
      destroyEditor()
    })

    /** 文档内容获取保存同步相关 */
    const setContent = (data) => {
      console.log(editorRef.value)
      editorRef.value.children = data
      editorRef.value.updateView()
    }

    return {
      // 编辑器相关
      editorRef,
      mode,
      toolbarConfig,
      editorConfig,
      handleCreated,
      setContent,
    };
  },
}
</script>

<style scoped>
html,
body {
  background-color: #fff;
  height: 100%;
  overflow: hidden;
  color: #333;
}
#top{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #FCFCFC;
  z-index: 1;
}
#function {
  position: fixed;
  top: 100px;
  left: 5%;
  /*width: 100%;*/
  z-index: 1;
}
#top-container {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  padding-left: 0px;
  height: 50px;
}

#editor-toolbar {
  width: 1350px;
  background-color: #FCFCFC;
  margin: 0 auto;
}

#content {
  margin-top: 80px;
  height: calc(100% - 40px);
  background-color: rgb(245, 245, 245);
  overflow-y: auto;

  position: relative;
}

#editor-container {
  width: 850px;
  margin: 30px auto 30px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}

#title-container {
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

#title-container input {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}

#editor-text-area {
  min-height: 900px;
  margin-top: 20px;
}
.top-ele{
  margin-bottom: auto;
  margin-top: auto;
}


</style>