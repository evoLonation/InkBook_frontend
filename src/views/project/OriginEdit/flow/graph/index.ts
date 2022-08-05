import {Graph, Addon, FunctionExt, Shape} from '@antv/x6'
import './shape'
import {ElMessage} from "element-plus";
import axios from "axios";
import store from "@/store"
import router from "@/router"
import {writeData, getData, onDataChange} from "../../../../../db"
import {ref} from "vue";

export default class FlowGraph {
  public static graph: Graph
  private static stencil: Addon.Stencil

  public static init() {
    this.graph = new Graph({
      container: document.getElementById('container')!,
      width: 1000,
      height: 800,
      grid: {
        size: 10,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#cccccc',
            thickness: 1,
          },
          {
            color: '#5F95FF',
            thickness: 1,
            factor: 4,
          },
        ],
      },

      scroller: {
        enabled: true,
        pageVisible: true,
        pageBreak: true,
        pannable: false,
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
        minScale: 0.5,
        maxScale: 2,
      },

      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
      },
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        highlight: true,
        snap: true,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            router: {
              name: 'manhattan',
            },
          })
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        },
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)',
            },
          },
        },
      },
      snapline: true,
      history: true,
      clipboard: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox()
          return this.getNodes().filter((node) => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData<any>()
            if (data && data.parent) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        },
      },
    })
    this.initStencil()
    this.initShape()
    this.initGraphShape()
    this.initEvent()
    return this.graph
  }
  public static setContent(data) {
    console.log(data)
    this.graph.fromJSON(data)
  }
  public static getContent() {
    return this.graph.toJSON().cells
  }
  // private static getContent() {
  //   return this.graph.toJSON().cells
  // }
  private static initStencil() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 280,
      search: { rect: true },
      collapsable: false,
      groups: [
        {
          name: 'basic',
          title: '流程节点',
          graphHeight: 180,
        },
        {
          name: 'combination',
          title: '组合节点',
          layoutOptions: {
            columns: 1,
            marginX: 60,
          },
          graphHeight: 260,
        },
        {
          name: 'group',
          title: '节点组',
          graphHeight: 100,
          layoutOptions: {
            columns: 1,
            marginX: 60,
          },
        },
      ],
    })
    const stencilContainer = document.querySelector('#stencil')
    stencilContainer?.appendChild(this.stencil.container)
  }

  private static initShape() {
    const { graph } = this
    const r1 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        body: {
          rx: 24,
          ry: 24,
        },
        text: {
          text: '起始节点',
        },
      },
    })
    const r2 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          text: '流程节点',
        },
      },
    })
    const r3 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 52,
      height: 52,
      angle: 45,
      attrs: {
        'edit-text': {
          style: {
            transform: 'rotate(-45deg)',
          },
        },
        text: {
          text: '判断节点',
          transform: 'rotate(-45deg)',
        },
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
              args: {
                dx: -26,
              },
            },
          },
          right: {
            position: {
              name: 'right',
              args: {
                dy: -26,
              },
            },
          },
          bottom: {
            position: {
              name: 'bottom',
              args: {
                dx: 26,
              },
            },
          },
          left: {
            position: {
              name: 'left',
              args: {
                dy: 26,
              },
            },
          },
        },
      },
    })
    const r4 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35,
        },
        text: {
          text: '链接节点',
        },
      },
    })

    const c1 = graph.createNode({
      shape: 'flow-chart-image-rect',
    })
    const c2 = graph.createNode({
      shape: 'flow-chart-title-rect',
    })
    const c3 = graph.createNode({
      shape: 'flow-chart-animate-text',
    })

    const g1 = graph.createNode({
      shape: 'groupNode',
      attrs: {
        text: {
          text: 'Group Name',
        },
      },
      data: {
        parent: true,
      },
    })
    this.stencil.load([r1, r2, r3, r4], 'basic')
    this.stencil.load([c1, c2, c3], 'combination')
    this.stencil.load([g1], 'group')
  }
  //从data.ts读取JSON图的方式和修改data的方式在这
  private static initGraphShape() {
    const originId = store.state.originId
    console.log('originId: ' + originId)
    const getPath = () => {
      return 'origin/' + originId
    }
    const getContentPath = () => {
      return getPath() + '/content'
    }
    const writeContentToFire = async () => {
      console.log('will write data')
      await writeData(getPath(), {
        userId: store.state.loginUser.userId,
        content: this.getContent()
      })
    }
    // const getUserIdPath = () => {
    //   return getPath() + '/userId'
    // }
    /**
     * 初始时获得文档内容
     */
    const initializeContent = async () => {
      console.log("开始获取文档内容")
      await axios.post('prototype/apply-edit', {
        userId: store.state.loginUser.userId,
        protoId : parseInt(originId),
      }).then(async res => {
        if (res.data.nowEditorNum === 1) {
          console.log("当前正在编辑人数为1，即将从数据库获取")
          await axios.get('prototype/get', {
            params: {
              userId: store.state.loginUser.userId,
              protoId: parseInt(originId),
            }
          }).then(async res => {
            console.log("res.data:")
            console.log(res.data)
            if (res.data.content !== '') {
              console.log('数据库中有内容，获得')
              console.log(JSON.parse(res.data.content))
              this.setContent(JSON.parse(res.data.content))
              await writeContentToFire()
            }
          }).catch(err => {
            console.log(err)
            ElMessage({message: '获得文档内容失败', type: 'warning'})
          })
        } else if (res.data.nowEditorNum >= 1) {
          console.log("当前正在编辑人数为" + res.data.nowEditorNum + "，从firebase获取")
          getData(getContentPath()).then(res => {
            console.log(res)
            this.setContent(res)
          })

        }
      }).catch(err => {
        console.log(err)
        ElMessage({message:'申请编辑失败',type:'warning'})
      })
    }
    /**
     * 更新数据库
     */
    const needUpdate = ref(false)
    const setUpdate = () => {
      needUpdate.value = true
    }
    const intervalUpdate = () => {
      this.intervalUpdateId = setInterval(() => {
        // if(!needUpdate.value) return;
        // needUpdate.value = false
        writeContentToFire()
      }, 1000)
    }
    const destroyIntervalUpdate = () => {
      clearInterval(this.intervalUpdateId)
    }
    /**
     * 实时获取最新内容
     */
    const getUpdate = () => {
      onDataChange(getPath(), (data)=>{
        console.log('updater is '+ data.userId + ', userId is '+ store.state.loginUser.userId)
        if(data.userId === store.state.loginUser.userId)return;
        this.setContent(data.content)
      })
    }
    /**
     * 编辑状态定时申请
     */
    const intervalEdit = () => {
      this.intervalEditId = setInterval(() => {
        console.log({
          "userId" : store.state.loginUser.userId,
          protoId: originId,
        })
        axios.post('prototype/apply-edit',
            {
              "userId" : store.state.loginUser.userId,
              "protoId": originId,
            }).then().catch(err => {
          if(err.response.status !== 409) ElMessage({message:'申请编辑失败',type:'warning'})
        })
      }, 2500)
    }
    const destroyIntervalEdit = () => {
      clearInterval(this.intervalEditId)
    }
    const postSave = () => {
      console.log('will save')
      console.log({
        "userId" : store.state.loginUser.userId,
        protoId: parseInt(originId),
        "content" : JSON.stringify(this.getContent())
      })
      axios.post('prototype/save',
          {
            "userId" : store.state.loginUser.userId,
            protoId: parseInt(originId),
            "content" : JSON.stringify(this.getContent())
          }
      ).then(res => {
        ElMessage({message: res.data.msg, type: 'success'})
      }).catch(err => {
        console.log(err)
        ElMessage({message: err.response.data.msg, type: 'warning'})
      })
    }
    const postQuitEdit = () => {
      axios.post('prototype/exit',
          {
            "userId" : store.state.loginUser.userId,
            protoId: parseInt(originId),
          }
      ).then(res => {
        if(res.data.remain === 0){
          postSave()
        }
      }).catch(err => {
        console.log(err)
      })
    }

    initializeContent()
    intervalUpdate()
    setUpdate()
    getUpdate()
    intervalEdit()
  }

  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
  public static intervalEditId;
  public static intervalUpdateId;


  private static initEvent() {
    const { graph } = this
    const container = document.getElementById('container')!

    graph.on('node:contextmenu', ({ cell, view }) => {
      console.log(view.container)
      const oldText = cell.attr('text/text') as string
      cell.attr('text/style/display', 'none')
      const elem = view.container.querySelector('.x6-edit-text') as HTMLElement
      if (elem) {
        elem.innerText = oldText
        elem.focus()
      }
      const onBlur = () => {
        cell.attr('text/text', elem.innerText)
      }
      if(elem){
        elem.addEventListener('blur', () => {
          onBlur()
          elem.removeEventListener('blur', onBlur)
        })
      }

    })
    graph.on('node:mouseenter', FunctionExt.debounce(() => {
      const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>
      this.showPorts(ports, true)
    }), 500,)
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll(
        '.x6-port-body',
      ) as NodeListOf<SVGAElement>
      this.showPorts(ports, false)
    })

    graph.on('node:collapse', ({ node, e }: any) => {
      e.stopPropagation()
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const cells = node.getDescendants()
      cells.forEach((n: any) => {
        if (collapsed) {
          n.hide()
        } else {
          n.show()
        }
      })
    })
    // backspace
    graph.bindKey('delete', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })
  }
}
