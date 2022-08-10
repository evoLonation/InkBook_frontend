<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane tab="节点" key="1">
      <a-row align="middle">
        <a-col :span=8>边缘颜色</a-col>
        <a-col :span=14>
          <a-input type="color" :value="globalGridAttr.nodeStroke" style="width: 100%" @change="onStrokeChange"/>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span=8>边缘宽度</a-col>
        <a-col :span=12>
          <a-slider :min=1 :max=5 :step=1 :value="globalGridAttr.nodeStrokeWidth" @change="onStrokeWidthChange"/>
        </a-col>
        <a-col :span=2>
          <div class="result">{{globalGridAttr.nodeStrokeWidth}}</div>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span=8>填充颜色</a-col>
        <a-col :span=14>
          <a-input type="color" :value="globalGridAttr.nodeFill" style="width: 100%" @change="onFillChange"/>
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane tab="文本" key="2">
      <a-row align="middle">
        <a-col :span=8>字体大小</a-col>
        <a-col :span=12>
          <a-slider :min=8 :max=32 :step=1 :value="globalGridAttr.nodeFontSize" @change="onFontSizeChange"/>
        </a-col>
        <a-col :span=2>
          <div class="result">{{ globalGridAttr.nodeFontSize }}</div>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span=8>字体颜色</a-col>
        <a-col :span=14>
          <a-input type="color" :value="globalGridAttr.nodeColor" style="width: 100%" @change="onColorChange"/>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span=8>文本内容</a-col>
        <a-col :span=14>
          <a-input :value="globalGridAttr.nodeText" style="width: 100%" @change="onTextChange"/>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span=8>选择按钮文本内容</a-col>
        <a-col :span=14>
          <a-input :value="globalGridAttr.nodeSelectText" style="width: 100%" @change="onSelectTextChange"/>
        </a-col>
      </a-row>
    </a-tab-pane>
    <a-tab-pane tab="图片属性" key="3">
      <a-row align="middle" >
        <a-col :span=8>修改图片</a-col>
        <a-col :span=14>

          <el-upload
              name="file"
              action
              drag
              :http-request="this.uploadImage"
              ref="upload"
              :limit="1"
              :auto-upload="true"
          >
            <el-button style="margin-top: 15px" round><i ></i><el-icon><Upload/></el-icon>封面</el-button>
          </el-upload>
          <!--          <a-input :value="globalGridAttr.imageUrl" style="width: 100%" @change="onImageUrlChange"/>-->
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span=8>图片url</a-col>
        <a-col :span=14>
          <a-input :value="globalGridAttr.imageUrl" style="width: 100%" @change="onImageUrlChange"/>
        </a-col>
      </a-row>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import {defineComponent, inject, ref, watch} from "vue";
import {Cell} from "@antv/x6";
import {nodeOpt} from "@/views/project/ProtoEdit/flow/components/ConfigPanel/ConfigNode/method";
import axios from "axios";
import {ElMessage} from "element-plus/es";

export default defineComponent({
  name: "index",
  setup(){
    const globalGridAttr: any = inject('globalGridAttr')
    const id: any = inject('id')
    let curCel: Cell;
    watch([()=>id.value],()=>{
      curCel = nodeOpt(id, globalGridAttr)
    },{
      immediate:false,
      deep:false
    })

    const onStrokeChange = (e: any) => {
      const val = e.target.value
      globalGridAttr.nodeStroke = val
      curCel?.attr('body/stroke', val)
    }

    const onStrokeWidthChange = (val: number) => {
      globalGridAttr.nodeStrokeWidth = val
      curCel?.attr('body/strokeWidth', val)
    }

    const onFillChange = (e: any) => {
      const val = e.target.value
      globalGridAttr.nodeFill = val
      curCel?.attr('body/fill', val)
    }

    const onFontSizeChange = (val: number) => {
      globalGridAttr.nodeFontSize = val
      curCel?.attr('text/fontSize', val)
    }

    const onColorChange = (e: any) => {
      const val = e.target.value
      globalGridAttr.nodeColor = val
      curCel?.attr('text/fill', val)
    }

    const onUsersChange = (e: any) =>{
      const val = e.target.value
      globalGridAttr.nodeUsers = val
      curCel?.attr('approve/users', val)
    }

    const fileList = ref([]);
    const onImageUrlChange = (url) => {
      globalGridAttr.imageUrl = url;
      curCel?.attr('image/href', url);
      console.log(url)
    }
    const uploadImage = (list) => {
      console.log('in upload')
      const f = new FormData()
      f.append('file', list.file)
      axios.post('/img', f).then(res => {
        ElMessage('修改图片成功')
        onImageUrlChange(res.data.url);
      }).catch(err => {
        console.log(err);
        ElMessage({message: err.response.data.msg, type: 'warning'});
      })
    }

    const onTextChange = (e: any) =>{
      const val = e.target.value
      globalGridAttr.nodeText = val
      curCel?.attr('text/text', val)
    }


    return{
      globalGridAttr,
      onStrokeChange,
      onStrokeWidthChange,
      onFillChange,
      onFontSizeChange,
      onColorChange,
      onUsersChange,
      uploadImage,
      onImageUrlChange,
      onTextChange,
    }
  }
})
</script>

<style lang="less" scoped>

</style>
