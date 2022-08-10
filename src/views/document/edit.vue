<template>


  <div id = "top">
    <div style="display: flex;height: 50px">

      <Collaboration :id="docId" ref="collaboration" type="doc"></Collaboration>
<!--      <div>-->
<!--        <input v-model="tempName"/>-->
<!--        <input v-model="tempIntro"/>-->
<!--        <el-button @click="clickCreateTemp">创建模板</el-button>-->
<!--      </div>-->

    </div>
    <div >
      <Toolbar
          id="editor-toolbar"
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
      />
    </div>
  </div>

  <div id="content">
    <div id="editor-container">
      <div id="title-container">
        <input v-model="myTitle">
      </div>
      <Editor
          id = "editor-text-area"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="onChange"
      />
    </div>
  </div>
  <div
    style="height: 100px;"
  >
    <el-button
        @click="save"
        style="margin-top: 30px; margin-right: 70px; float: right"
        type="primary"
    >
      保存文档
    </el-button>
  </div>
  <p>{{valueHtml}}</p>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, ref, shallowRef, provide, onMounted} from 'vue'
// import {SlateEditor, SlateElement, SlateTransforms} from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {getData, onDataChange, writeData} from "../../collaboration/db";
import axios from "axios";
import {ElMessage} from "element-plus";
import {useRoute, } from "vue-router/dist/vue-router";
import {useStore} from "vuex";
import Collaboration from "@/components/Collaboration";

export default {
  components: { Editor, Toolbar, Collaboration},
  data(){
    return {
      myTitle: '',
    };
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const docId = parseInt(route.params.docId);
    const userId = store.state.loginUser.userId;
    const valueHtml = ref('');

    /**
     * 编辑器初始化与销毁相关操作
     * @type {ShallowRef<any>}
     */
    // 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。
    const editorRef = shallowRef()

    // 组件销毁时，也及时销毁编辑器
    const destroyEditor =  () => {
      const editor = editorRef.value
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
      MENU_CONF: {
        uploadImage: {
          server: 'http://localhost/api/document/img',
          async customUpload(file, insertFn) {
            const form = new FormData();
            form.append("file",file);
            axios.post("document/img", form).then((response)=>{
                console.log(response.data);
                console.log(insertFn);
                insertFn(response.data.url);
            }).catch((err)=>{
              ElMessage(err.response.data.msg, 'warning')
            });
          },
          fieldName: 'custom-fileName',
          onProgress(progress) {
            console.log('onProgress', progress)
          },
          onSuccess(file, res) {
            console.log('onSuccess', file, res)
          },
          onFailed(file, res) {
            alert(res.message)
            console.log('onFailed', file, res)
          },
          onError(file, err, res) {
            alert(err.message)
            console.error('onError', file, err, res)
          },
        }
      }
    }


    /** 文档内容获取保存同步相关 */
    const setContent = (data) => {
      console.log(editorRef.value)
      editorRef.value.children = data
      editorRef.value.updateView()
    }
    const getContent = () => {
      return editorRef.value.children;
    }


    const handleCreated = (editor) => {
      console.log("编辑器创建成功");
      editorRef.value = editor // 记录 editor 实例，重要！
      console.log(editorRef.value.children)
    };


    const collaboration = ref(null);

    onBeforeUnmount(() => {
      destroyEditor()
    })

    onMounted(() => {
      collaboration.value.setSetter(setContent);
      collaboration.value.setGetter(getContent);
      collaboration.value.start();
    })
    const onChange = () => {
      collaboration.value.update();
    }
    const save = () => {
      collaboration.value.save();
    }

    const tempName = ref('');
    const tempIntro = ref('');
    const clickCreateTemp = () => {
      axios.post('template/create', {
        "name": tempName.value,
        "type": 1,
        "creatorId": userId,
        "intro": tempIntro.value,
        "content": JSON.stringify(getContent()),
      }).then(() => {
        ElMessage({message: '保存成功', type: 'success'});
      }).catch((err) => {
        console.log(err)
        ElMessage({message: err.response.data.msg, type: 'warning'})
      });
    };

    const clickExportPdf = () => {
      axios.post('translate2pdf', {
        data: valueHtml.value,
      }).then(() => {
        window.open('http://43.138.71.108/api/downloadpdf')
      }).catch(err => {
        console.log(err)
      })
    }
    const clickExportMd = () => {
      axios.post('translate2md', {
        data: valueHtml.value,
      }).then(() => {
        window.open('http://43.138.71.108/api/downloadmd')
      }).catch(err => {
        console.log(err)
      })
    }

    return {
      valueHtml,
      // 编辑器相关
      editorRef,
      mode,
      toolbarConfig,
      editorConfig,
      handleCreated,
      onChange,
      docId,
      collaboration,
      save,

      tempName,
      tempIntro,
      clickCreateTemp,
      clickExportPdf,
      clickExportMd,
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