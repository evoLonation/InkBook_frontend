<template>
  <div class="bar">
    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + D</span>
      </template>
      <a-button name="delete" @click="handleClick" class="item-space" size="small" >
        清除
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + Z</span>
      </template>
      <a-button :disabled="!canUndo" name="undo" @click="handleClick" class="item-space" size="small" >
        撤销
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + Shift + Z</span>
      </template>
      <a-button :disabled="!canRedo" name="redo" @click="handleClick" class="item-space" size="small" >
        重做
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + Shift + Z</span>
      </template>
      <a-button name="copy" @click="handleClick" class="item-space" size="small" >
        复制
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + X</span>
      </template>
      <a-button name="cut" @click="handleClick" class="item-space" size="small" >
        剪切
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + V</span>
      </template>
      <a-button name="paste" @click="handleClick" class="item-space" size="small" >
        粘贴
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + S</span>
      </template>
      <a-button name="savePNG" @click="handleClick" class="item-space" size="small">
        保存为PNG
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + S</span>
      </template>
      <a-button name="saveSVG" @click="handleClick" class="item-space" size="small">
        保存为SVG
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Cmd + P</span>
      </template>
      <a-button name="print" @click="handleClick" class="item-space" size="small">
        打印
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <el-button name="toJSON" @click="handleClick" class="item-space" type="success">
        保存
      </el-button>
    </a-tooltip>
    <el-button @click="quitEdit" class="item-space" type="danger">退出</el-button>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue"// ref, reactive
import FlowGraph from '../../graph'
import { DataUri } from '@antv/x6'
import axios from "axios";
import store from "@/store"
import {ElMessage} from "element-plus";
import router from "@/router"

export default defineComponent({
  name: "index",
  components:{
  },
  setup(){
    const { graph } = FlowGraph
    const { history } = graph

    const canUndo = ref(history.canUndo())
    const canRedo = ref(history.canRedo())

    const saveGraph = (cells) => {
      console.log('will save')
      console.log({
        "userId" : store.state.loginUser.userId,
        protoId: parseInt(store.state.originId),
        "content" : JSON.stringify(FlowGraph.getContent())
      })
      axios.post('prototype/save',
          {
            "userId" : store.state.loginUser.userId,
            protoId: parseInt(store.state.originId),
            "content" : JSON.stringify(FlowGraph.getContent())
          }
      ).then(res => {
        ElMessage({message: res.data.msg, type: 'success'})
      }).catch(err => {
        console.log(err)
        ElMessage({message: err.response.data.msg, type: 'warning'})
      })
    }

    const quitEdit = () => {
      // axios.post('/graph/exit', {
      //   "graphId": store.state.graphId,
      //   "userId": store.state.loginUser.userId,
      // }).then((response) => {
      //   if (response.status === 200){
      //     console.log(response.data.msg)
      //   }
      //   else {
      //     ElMessage('其他错误')
      //   }
      // }).catch((err) => {
      //   console.log(err)
      // })
      clearInterval(FlowGraph.intervalEditId)
      clearInterval(FlowGraph.intervalUpdateId)
      router.push({name: 'TopTable'})
    }

    const copy = () => {
      const { graph } = FlowGraph
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    }

    const cut = () => {
      const { graph } = FlowGraph
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
      return false
    }

    const paste = () => {
      const { graph } = FlowGraph
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    }

    const handleClick = (event: Event) => {
      const { graph } = FlowGraph
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
            backgroundColor:'white',
            padding: {
              top: 20,
              right: 30,
              bottom: 40,
              left: 50,
            },
            quality:1
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
          copy()
          break
        case 'cut':
          cut()
          break
        case 'paste':
          paste()
          break
        case 'toJSON':
          //将图转为JSON的方式在这
          console.log(graph.toJSON().cells)
            saveGraph(graph.toJSON().cells)

          // graph.fromJSON({cells:[graph.toJSON().cells[0],graph.toJSON().cells[1]]})
          break
        default:
          break
      }
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
      handleClick,
      quitEdit
    }
  }
})
</script>

<style lang="less" scoped>
.bar{
  margin-right:16px;
}
.item-space{
  margin-left:16px;
}
</style>
