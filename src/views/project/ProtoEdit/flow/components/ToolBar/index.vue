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
        <el-button name="toJSON" @click="preview" class="item-space" round>
          <el-icon><View /></el-icon>
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


  </div>
</template>


<script lang="ts">
import {defineComponent, ref} from "vue"// ref, reactive
import FlowGraph from '../../graph'
import {DataUri} from '@antv/x6'
import axios from "axios";
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
  methods: {
    preview(){
      this.saveGraph(this.graph.toJSON().cells)
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
      setTimeout(()=>{this.$router.push({name: 'protoPreview', params:{protoId: this.graphId}})},500)
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
  margin-left: 100px;
  width: 70px;
  height: 30px;
}
</style>
