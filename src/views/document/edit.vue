<template>
  <button @click="insert"></button>
  <button @click="getSelected" >getLocation</button>
  <button @click="getSelection" >getSelection</button>

  <div id = "top">
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
  <p></p>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef} from 'vue'
// import {SlateEditor, SlateElement, SlateTransforms} from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {getData, onDataChange, writeData} from "./db";
import axios from "axios";
import {ElMessage} from "element-plus";
import {useRoute, } from "vue-router/dist/vue-router";
import {useStore} from "vuex";

export default {
  components: { Editor, Toolbar},
  data(){
    return {
      otherEditing: false,
      myDocName : "",
      valueHtml : "",
      title : "未命名",
      auth: 2,
      drawerDisplay : false,
      commentContent : "",
      displayNewComment : false,
      myDocId: '',
      myEditor: '',
      myAuthority: 2 ,
      myModifyTime: '',
      editIntervalId: 0,
      myTitle: '',
      isUpdate: false, // is some others update the content
      updateId: 0
    };
  },
  setup() {

    const route = useRoute()
    const store = useStore()


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
    let mode = ref('default')
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
            let form = new FormData();
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
      editorRef.value.children = data
      editorRef.value.updateView()
    }
    const getContent = () => {
      return editorRef.value.children;
    }




    const getPath = () => {
      return 'doc/' + route.params.docId
    }
    const getContentPath = () => {
      return getPath() + '/userId'
    }
    // const getUserIdPath = () => {
    //   return getPath() + '/content'
    // }
    /**
     * 初始时获得文档内容
     */
    const initializeContent = () => {
      axios.get('document/get', {
        params: {
          docId : route.params.docId,
        }
      }).then(res => {
        setContent(res.data.content)
      }).catch(err => {
        if(err.response.status === 409){
          let data = getData(getContentPath())
          setContent(data)
        }
      })
    }
    /**
     * 更新数据库
     */
    const needUpdate = ref(false)
    const setUpdate = () => {
      needUpdate.value = true
    }
    let intervalId ;
    const intervalUpdate = () => {
      intervalId = setInterval(() => {
        if(!needUpdate.value) return;
        needUpdate.value = false
        writeData(getPath(), {
          userId: store.state.loginUser.userId,
          content: getContent()
        })
      }, 1000)
    }
    const destroyIntervalUpdate = () => {
      clearInterval(intervalId)
    }
    /**
     * 实时获取最新内容
     */
    const getUpdate = () => {
      onDataChange(getPath(), (data)=>{
        console.log('updater is '+ data.userId + ', userId is '+ store.state.loginUser.userId)
        if(data.userId === store.state.loginUser.userId)return;
        setContent(data.content)
      })
    }






    const handleCreated = (editor) => {
      console.log("编辑器创建成功");
      editorRef.value = editor // 记录 editor 实例，重要！
      console.log(editorRef.value)
      initializeContent()
      intervalUpdate()
      getUpdate()
    };
    const onChange = () => {
      setUpdate()
    }
    onBeforeUnmount(() => {
      destroyEditor()
      destroyIntervalUpdate()
    })

    return {
      // 编辑器相关
      editorRef,
      mode,
      toolbarConfig,
      editorConfig,
      handleCreated,
      onChange
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
  margin: 30px auto 150px auto;
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