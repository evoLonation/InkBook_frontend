import {Graph, Addon, FunctionExt, Shape} from '@antv/x6'
import './shape'
import {ElMessage} from "element-plus";
import axios from "axios";
import router from "@/router"
import store from "@/store"

export default class FlowGraph {
  public static graph: Graph
  public static graphId
  private static stencil: Addon.Stencil
  public static init(graphId) {
    this.graph = new Graph({
      resizing: {
        enabled: true,
      },
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
    this.initGraphShape(graphId)
    this.initEvent()
    return this.graph
  }
  public static setContent(data) {
    this.graph.fromJSON(data)
  }
  public static getContent(){
    return this.graph.toJSON().cells
  }
  private static initStencil() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 280,
      search: { rect: true },
      collapsable: false,
      groups: [
        {
          name: 'basic',
          title: '流程图',
          graphHeight: 180,
        },
        {
          name: 'combination',
          title: '类图',
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
    const r5 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 20,
          ry: 20,
        },
        text: {
          text: 'xx节点',
        },
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
            },
            right: {
              position: {
                name: 'right',
              },
            },
            bottom: {
              position: {
                name: 'bottom',
              },
            },
            left: {
              position: {
                name: 'left',
              },
            },
          },
        },
      },
    })
    const r6 = graph.createNode({
      shape: 'flow-chart-rect',
      width: 70,
      height: 70,
      attrs: {
        text: {
          text: 'xx节点',
        },
      },
      ports: {
        groups: {
          top: {
            position: {
              name: 'top',
            },
            right: {
              position: {
                name: 'right',
              },
            },
            bottom: {
              position: {
                name: 'bottom',
              },
            },
            left: {
              position: {
                name: 'left',
              },
            },
          },
        },
      },
    })
    const r7 = graph.createNode({
      shape: 'flow-chart-rect',
      attrs: {
        text: {
          text: '文本框',
        },
        body: {
          stroke: '#fff',
        }
      },
    })
    const r8 = graph.createNode({
      shape: 'flow-chart-polygon',
      attrs: {
        text: {
          text: '',
        },
        body: {
          stroke: '#5F95FF'
        }
      },
    })
    const r9 = graph.createNode({
      shape: 'flow-chart-love',
      attrs: {
        text: {
          text: '',
        },
        body: {
          stroke: '#5F95FF'
        }
      },
    })
    const r10 = graph.createNode({
      shape: 'flow-chart-fs',
      attrs: {
        text: {
          text: '',
        },
        body: {
          stroke: '#5F95FF'
        }
      },
    })
    const r11 = graph.createNode({
      shape: 'flow-chart-connect',
      attrs: {
        text: {
          text: '我也不知道是啥',
        },
        body: {
          stroke: '#5F95FF'
        }
      },
    })
    const r12 = graph.createNode({
      x: 40,
      y: 40,
      width: 10,
      height: 10,
      shape: 'html',
      html() {
        const wrap = document.createElement('input')
        wrap.style.width = '100'
        wrap.style.height = '100'
        wrap.type = "radio"

        return wrap
      }
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
  private static initGraphShape(graphId) {
    this.graphId = graphId
    console.log(graphId)
    axios.get('graph/get', {
      params: {
        graphId: graphId
      }
    }).then((response) => {
      if (response.status === 409){
        ElMessage('当前图正在被编辑！')
        router.push({name: "TopTable"})
      }
      else {
        console.log(response.data.msg)
        this.setContent(JSON.parse(response.data.content))
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

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
    //画布发生改变的监听事件
    graph.on('cell:changed', () => {

    })
    graph.on('cell:added', () => {

    })
    graph.on('node:added', () => {

    })
    graph.on('node:change:*', () => {

    })
  }
}
