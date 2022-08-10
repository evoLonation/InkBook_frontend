<template>
  <div class="bar">
    <el-button-group>
      <el-tooltip placement="bottom" content="清除 Ctrl+D">
        <el-button name="delete" @click="handleClick" class="item-space" size="small" round>
          <el-icon>
            <Delete/>
          </el-icon>
        </el-button>
      </el-tooltip>

      <el-tooltip placement="bottom" content="撤销 Ctrl+Z">
        <el-button :disabled="!canUndo" name="undo" @click="handleClick" class="item-space" size="small">
          <el-icon>
            <RefreshLeft/>
          </el-icon>
        </el-button>
      </el-tooltip>

      <el-tooltip placement="bottom" content="重做 Ctrl+Y">
        <el-button :disabled="!canRedo" name="redo" @click="handleClick" class="item-space" size="small">
          <el-icon>
            <RefreshRight/>
          </el-icon>
        </el-button>
      </el-tooltip>

      <el-tooltip placement="bottom" content="复制 Ctrl+C">
        <el-button name="copy" @click="handleClick" class="item-space" size="small">
          <el-icon>
            <CopyDocument/>
          </el-icon>
        </el-button>
      </el-tooltip>

      <el-tooltip placement="bottom" content="剪切 Ctrl+X">
        <el-button name="cut" @click="handleClick" class="item-space" size="small">
          <el-icon>
            <Scissor/>
          </el-icon>
        </el-button>
      </el-tooltip>

      <el-tooltip placement="bottom" content="粘贴 Ctrl+V">
        <el-button name="paste" @click="handleClick" class="item-space" size="small">
          <el-icon>
            <BrushFilled/>
          </el-icon>
        </el-button>
      </el-tooltip>

      <el-tooltip placement="bottom" content="下载PNG Ctrl+S">
        <el-button name="savePNG" @click="handleClick" class="item-space" size="small">
          <el-icon>
            <Download/>
          </el-icon>
          PNG
        </el-button>
      </el-tooltip>

      <el-tooltip placement="bottom" content="下载SVG">
        <el-button name="saveSVG" @click="handleClick" class="item-space" size="small">
          <el-icon>
            <Download/>
          </el-icon>
          SVG
        </el-button>
      </el-tooltip>

      <el-tooltip placement="bottom" content="打印 Ctrl+P">
        <el-button name="print" @click="handleClick" class="item-space" size="small" round>
          <el-icon>
            <Printer/>
          </el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip placement="bottom" content="保存">
        <el-button name="toJSON" @click="handleClick" class="item-space" round>
          <el-icon color="lightblue"><Select/></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip placement="bottom" content="预览">
        <el-button name="toJSON" @click="this.setPreview()" class="item-space" round>
          <el-icon><View /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip placement="bottom" content="关闭预览">
        <el-button v-if="showClose" v-model="showClose" name="toJSON" @click="this.closePreview()" class="item-space" round>
          <el-icon><Hide /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip placement="bottom" content="退出">
        <el-button @click="quitEdit" class="item-space" round>
          <el-icon color="red">
            <CloseBold/>
          </el-icon>
        </el-button>
      </el-tooltip>
    </el-button-group>
  <el-dialog
    v-model="this.previewVisible"
    width="25%"
    custom-class="dialog">
    <input id="input" value="这是幕后黑手" style="opacity:0;position:absolute" />
    <h1>预览</h1>
    <span style="width: 100%;margin-top: 70px">已生成预览链接:</span>
    <el-link type="primary" :href="this.link" style="margin-top: 30%">{{link}}</el-link>
    <template #footer>
      <span class="dialog-footer">
        <el-tooltip
          content="复制"
          placement="bottom">
          <el-button @click="this.copyLink()" color="royalblue" circle><el-icon><CopyDocument /></el-icon></el-button>
        </el-tooltip>
      </span>
    </template>
  </el-dialog>
  </div>
</template>


<script lang="ts">
import {defineComponent, ref} from "vue"// ref, reactive
import FlowGraph from '../../graph'
import {DataUri} from '@antv/x6'
import axios from "axios"
import store from "@/store"
import {ElMessage} from "element-plus";
import router from "@/router"
import {CopyDocument, Delete, RefreshLeft} from "@element-plus/icons";

export default defineComponent({
  name: "index",
  props: ["graphId"],
  components: {
    CopyDocument,
    RefreshLeft,
    Delete
  },
  setup() {
    const {graph} = FlowGraph
    const {history} = graph

    const canUndo = ref(history.canUndo())
    const canRedo = ref(history.canRedo())

    const copy = () => {
      const {graph} = FlowGraph
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    }

    const cut = () => {
      const {graph} = FlowGraph
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
      return false
    }

    const paste = () => {
      const {graph} = FlowGraph
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({offset: 32})
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    }


    history.on('change', () => {
      canUndo.value = history.canUndo()
      canRedo.value = history.canRedo()
    })
    graph.bindKey('ctrl+z', () => {
      if (history.canUndo()) {
        history.undo()
      }
      return false
    })
    graph.bindKey('ctrl+shift+z', () => {
      if (history.canRedo()) {
        history.redo()
      }
      return false
    })
    graph.bindKey('ctrl+d', () => {
      graph.clearCells()
      return false
    })
    graph.bindKey('ctrl+s', () => {
      graph.toPNG((datauri: string) => {
        DataUri.downloadDataUri(datauri, 'chart.png')
      })
      return false
    })
    graph.bindKey('ctrl+p', () => {
      graph.printPreview()
      return false
    })
    graph.bindKey('ctrl+c', copy)
    graph.bindKey('ctrl+v', paste)
    graph.bindKey('ctrl+x', cut)


    return {
      canUndo,
      canRedo,
      copy,
      cut,
      paste,
      graph,
    }
  },

  data(){
    return{
      previewVisible: false,
      link:'',
      showClose: false,
    }
  },
  mounted() {
    this.link='http://192.168.0.102:8080/#/proto/preview/'+this.graphId.toString() + '/' + this.$store.state.selectProject.proId.toString()
    console.log('protoId',this.graphId)
    this.$axios.get('/prototype/get-preview',{
      params:{
        protoId: this.graphId
      }
    }).then(res=>{
      console.log(res.data.msg)
      if (res.data.type === 'close')
        this.showClose = false
      else
        this.showClose = true
      console.log('show', this.showClose)
    })
  },
  methods: {
    closePreview(){
      axios.post('/prototype/set-preview',{
        'protoId': this.graphId,
        'type': 'close',
      }).then(res=>{
        console.log(res.data.msg)
        ElMessage('已关闭预览')
      }).catch(err=>{
        console.log(err)
      })
      this.showClose = false
      // this.$axios.post('/prototype/get-preview',{
      //   'protoId': this.graphId
      // }).then(res=>{
      //   console.log(res.data.msg)
      //   if (res.data.type === 'close')
      //     this.showClose = false
      //   else
      //     this.showClose = true
      // })
    },
    copyLink(){
      const input = document.getElementById('input')! as any; // 承载复制内容
      input.value = this.link; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand('copy'); // 执行浏览器复制命令
      ElMessage('复制成功')
    },
    setPreview(){
      this.saveGraph(this.graph.toJSON().cells);
      this.previewVisible=true
      this.showClose=true
      setTimeout(()=>{
        axios.post('/prototype/set-preview',{
          'protoId': this.graphId,
          'type': 'open',
        }).then(res=>{
          console.log(res.data.msg)
        }).catch(err=>{
          console.log(err)
        })
      },500)
    },
    preview(){
      this.$router.push({path:`/proto/preview/${this.graphId}/${this.$store.selectProject.proId}`})
    },
    saveGraph(cells) {
      axios.post('/prototype/save', {
        "protoId": parseInt(this.graphId),
        "userId": store.state.loginUser.userId,
        "content": JSON.stringify(cells)
      }).then((response) => {
        if (response.status === 200) {
          console.log(response.data.msg)
          ElMessage('保存到云端成功')
        } else {
          ElMessage('其他错误')
        }
      }).catch((err) => {
        console.log(err)
      })
      console.log('inpng')
      let blob
      this.graph.toPNG((datauri: string) => {
        blob = DataUri.dataUriToBlob(datauri)
        console.log(blob)
        const f = new FormData()
        f.append('protoId', this.graphId)
        f.append('newImg', blob)
        console.log(blob)
        this.$axios.post('/prototype/modify/img', f).then(res=>{
          console.log(res.data.mag)
        })
      })

    },

    quitEdit() {
          router.push({name: 'TopTable', params:{type:'proto'}})
    },

    handleClick(event: Event) {
      const {graph} = FlowGraph
      const name = (event.currentTarget as any).name!
      switch (name) {
        case 'undo':
          graph.history.undo()
          break
        case 'redo':
          graph.history.redo()
          break
        case 'delete':
          graph.clearCells()
          break
        case 'savePNG':
          graph.toPNG((dataUri: string) => {
            // 下载
            DataUri.downloadDataUri(dataUri, 'chartx.png')
          }, {
            backgroundColor: 'white',
            padding: {
              top: 20,
              right: 30,
              bottom: 40,
              left: 50,
            },
            quality: 1
          })
          break
        case 'saveSVG':
          graph.toSVG((dataUri: string) => {
            // 下载
            DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg')
          })
          break
        case 'print':
          graph.printPreview()
          break
        case 'copy':
          this.copy()
          break
        case 'cut':
          this.cut()
          break
        case 'paste':
          this.paste()
          break
        case 'toJSON':
          //将图转为JSON的方式在这
          console.log(graph.toJSON().cells)
          this.saveGraph(graph.toJSON().cells)

          // graph.fromJSON({cells:[graph.toJSON().cells[0],graph.toJSON().cells[1]]})
          break
        default:
          break
      }
    }
  },
})
</script>

<style lang="less" scoped>

.bar {
  margin-right: 16px;
}
.item-space {
  margin-left: 50px;
  width: 50px;
  height: 30px;
}
</style>
<style>
.dialog {
  border-radius: 25px;
}
</style>
