import {Graph, Addon, FunctionExt, Shape} from '@antv/x6'
import './shape'
import {ElMessage} from "element-plus";
import axios from "axios";
import router from "@/router"

export default class FlowGraph {
  public static graph: Graph
  private static stencil: Addon.Stencil
  public static init(graphId) {
    this.graph = new Graph({
      container: document.getElementById('container')!,
      resizing: {
        enabled: true,
        restricted: false,
        autoScroll: false,
      },
      width: 600,
      height: 900,
      autoResize: false,
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
        width: 600,
        height: 900,
        enabled: true,
        pageVisible: true,
        pageBreak: false,
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
  private static setContent(data) {
    console.log(data)
    this.graph.fromJSON(data)
  }
  private static initStencil() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 270,
      search: { rect: true },
      collapsable: false,
      groups: [
        {
          name: 'basic',
          title: '图形',
          graphHeight: 500,
        },
        {
          name: 'combination',
          title: '图标',
          graphHeight: 650,
        },
        {
          name: 'group',
          title: '功能',
          graphHeight: 300,
        },
      ],
    })
    const stencilContainer = document.querySelector('#stencil')
    stencilContainer?.appendChild(this.stencil.container)
  }
  private static initShape() {
    const { graph } = this
    const r1 = graph.createNode({
      shape: 'flow-chart-Rect',
      attrs: {
        body: {
          rx: 24,
          ry: 24,
        },
      },
    })
    const r2 = graph.createNode({
      shape: 'flow-chart-Rect',
      attrs: {
      },
    })
    const r3 = graph.createNode({
      shape: 'flow-chart-Rect',
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
      shape: 'flow-chart-Rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 35,
          ry: 35,
        },
        text: {
          text: '',
        },
      },
    })
    const r5 = graph.createNode({
      shape: 'flow-chart-Rect',
      width: 70,
      height: 70,
      attrs: {
        body: {
          rx: 20,
          ry: 20,
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
      shape: 'flow-chart-Rect',
      width: 70,
      height: 70,
      attrs: {
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
      shape: 'flow-chart-Rect',
      attrs: {
        text: {
          text: '文本框',
          fontSize: 16
        },
        body: {
          stroke: '#fff',
        }
      },
    })
    const r8 = graph.createNode({
      width: 80,
      height: 60,
      shape: 'flow-chart-Polygon',
      attrs: {
        body: {
          refPoints: '10,0 40,0 30,20 0,20',
        },
      },
    })
    const r9 = graph.createNode({
      shape: 'path',
      x: 370,
      y: 180,
      width: 80,
      height: 80,
      path:
          'M52.104,0.249c-0.216-0.189-0.501-0.275-0.789-0.241l-31,4.011c-0.499,0.065-0.872,0.489-0.872,0.992v6.017v4.212v26.035C17.706,39.285,14.997,38,11.944,38c-5.247,0-9.5,3.781-9.5,8.444s4.253,8.444,9.5,8.444s9.5-3.781,9.5-8.444c0-0.332-0.027-0.658-0.069-0.981c0.04-0.108,0.069-0.221,0.069-0.343V16.118l29-3.753v18.909C48.706,29.285,45.997,28,42.944,28c-5.247,0-9.5,3.781-9.5,8.444s4.253,8.444,9.5,8.444s9.5-3.781,9.5-8.444c0-0.092-0.012-0.181-0.015-0.272c0.002-0.027,0.015-0.05,0.015-0.077V11.227V7.016V1C52.444,0.712,52.32,0.438,52.104,0.249z',
      attrs: {
        body: {
          fill: '#eb2f96',
          stroke: 'none',
        },
      },
    })
    const r10 = graph.createNode({
      shape: 'path',
      x: 50,
      y: 180,
      width: 80,
      height: 80,
      path:
          'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
      attrs: {
        body: {
          fill: '#D75A4A',
          stroke: 'none',
        },
      },
    })
    const r11 = graph.createNode({
      shape: 'path',
      x: 210,
      y: 180,
      width: 80,
      height: 80,
      path:
          'M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956C22.602,0.567,25.338,0.567,26.285,2.486z',
      attrs: {
        body: {
          fill: '#ED8A19',
          stroke: 'none',
        },
      },
    })
    const r12 = graph.createNode({
      shape: 'cylinder',
      x: 30,
      y: 100,
      width: 50,
      height: 70,
      attrs: {
        top: {
          fill: '#fe854f',
          fillOpacity: 0.5,
        },
        body: {
          fill: '#ED8A19',
          fillOpacity: 0.8,
        },
      },
    })
    const r14 = graph.createNode({
      x: 320,
      y: 120,
      width: 96,
      height: 96,
      markup: [
        {
          tagName: 'path',
          selector: 'eye1',
          groupSelector: 'eye',
          attrs: {
            d:
                'M24.82,48.678c5.422,0,9.832-6.644,9.832-14.811c0-8.165-4.41-14.809-9.832-14.809s-9.833,6.644-9.833,14.809C14.987,42.034,19.399,48.678,24.82,48.678z',
          },
        },
        {
          tagName: 'path',
          selector: 'eye2',
          groupSelector: 'eye',
          attrs: {
            d:
                'M71.606,48.678c5.422,0,9.833-6.644,9.833-14.811c0-8.165-4.411-14.809-9.833-14.809c-5.421,0-9.831,6.644-9.831,14.809C61.775,42.034,66.186,48.678,71.606,48.678z',
          },
        },
        {
          tagName: 'path',
          selector: 'lip',
          attrs: {
            d:
                'M95.855,55.806c-0.6-0.605-1.516-0.77-2.285-0.4C81.232,61.29,65.125,64.53,48.214,64.53c-16.907,0-33.015-3.24-45.354-9.123c-0.77-0.367-1.688-0.205-2.284,0.4c-0.599,0.606-0.747,1.526-0.369,2.29c5.606,11.351,25.349,19.277,48.008,19.277c22.668,0,42.412-7.929,48.012-19.279C96.603,57.332,96.453,56.411,95.855,55.806z',
          },
        },
      ],
      attrs: {
        lip: {
          fill: '#E0A31A',
        },
        eye: {
          fill: '#730000',
        },
      },
    })
    const switchCenter = {
      x: 35,
      y: -2,
    }
    const switchOpen = `rotate(-30 ${switchCenter.x} ${switchCenter.y})`
    const switchClose = `rotate(-12 ${switchCenter.x} ${switchCenter.y})`
    const r15 = graph.createNode({
      x: 20,
      y: 20,
      width: 100,
      height: 10,
      markup: [
        {
          tagName: 'g',
          selector: 'left-group',
          children: [
            {
              tagName: 'rect',
              selector: 'left',
              groupSelector: 'line',
              attrs: {
                x: 0,
                y: 0,
              },
            },
            {
              tagName: 'circle',
              selector: 'lco',
              groupSelector: 'co',
              attrs: {
                cx: 30,
              },
            },
            {
              tagName: 'circle',
              selector: 'lci',
              groupSelector: 'ci',
              attrs: {
                cx: 30,
              },
            },
          ],
        },
        {
          tagName: 'rect',
          selector: 'switch',
          groupSelector: 'line',
        },
        {
          tagName: 'g',
          selector: 'right-group',
          children: [
            {
              tagName: 'rect',
              selector: 'right',
              groupSelector: 'line',
              attrs: {
                x: 70,
                y: 0,
              },
            },
            {
              tagName: 'circle',
              selector: 'rco',
              groupSelector: 'co',
              attrs: {
                cx: 70,
              },
            },
            {
              tagName: 'circle',
              selector: 'rci',
              groupSelector: 'ci',
              attrs: {
                cx: 70,
              },
            },
          ],
        },
      ],
      attrs: {
        line: {
          width: 30,
          height: 2,
          fill: '#000',
          stroke: '#000',
        },
        co: {
          r: 8,
          fill: '#000',
        },
        ci: {
          r: 4,
          fill: '#fff',
        },
        switch: {
          ...switchCenter,
          width: 35,
          transform: switchOpen,
        },
      },
    })
    // graph.on('node:click', ({ node }) => {
    //   const attrPath = 'attrs/switch/transform'
    //   const current = node.prop(attrPath)
    //   const target = current === switchOpen ? switchClose : switchOpen
    //
    //   node.transition(attrPath, target, {
    //     interp: (a: string, b: string) => {
    //       const reg = /-?\d+/g
    //       const start = parseInt(a.match(reg)![0], 10)
    //       const end = parseInt(b.match(reg)![0], 10)
    //       const d = end - start
    //       return (t: number) => {
    //         return `rotate(${start + d * t} ${switchCenter.x} ${switchCenter.y})`
    //       }
    //     },
    //   })
    // })

    graph.on('node:click', ({ node }) => {
      const attrPath = 'attrs/switch/transform'
      const current = node.prop(attrPath)
      const target = current === switchOpen ? switchClose : switchOpen

    })

    const r16 = graph.createNode({
      x: 280,
      y: 120,
      width: 80,
      height: 60,
      shape: 'image',
      imageUrl: ''
    })

    // const r17 = graph.addNode({
    //   x: 40,
    //   y: 40,
    //   width: 100,
    //   height: 40,
    //   shape: 'vue-shape',
    //   component: 'image',
    // });

    const i1 = graph.createNode({
      shape: "my-avatar",
      width: 50,
      height: 50,
    });

    const i2 = graph.createNode({
      shape: "my-avatar2",
      width: 50,
      height: 50,
    });

    const i3 = graph.createNode({
      shape: "my-avatar3",
      width: 50,
      height: 50,
    });

    const i4 = graph.createNode({
      shape: "my-avatar4",
      width: 50,
      height: 50,
    });

    const i5 = graph.createNode({
      shape: "my-avatar5",
      width: 50,
      height: 50,
    });

    const i6 = graph.createNode({
      shape: "my-avatar6",
      width: 50,
      height: 50,
    });

    const i7 = graph.createNode({
      shape: "my-avatar7",
      width: 50,
      height: 50,
    });

    const i8 = graph.createNode({
      shape: "my-avatar8",
      width: 50,
      height: 50,
    });

    const i9 = graph.createNode({
      shape: "my-avatar9",
      width: 50,
      height: 50,
    });

    const i10 = graph.createNode({
      shape: "my-avatar10",
      width: 50,
      height: 50,
    });

    const i11 = graph.createNode({
      shape: "my-avatar11",
      width: 50,
      height: 50,
    });

    const i12 = graph.createNode({
      shape: "my-avatar12",
      width: 50,
      height: 50,
    });

    const i13 = graph.createNode({
      shape: "my-avatar13",
      width: 50,
      height: 50,
    });

    const i14 = graph.createNode({
      shape: "my-avatar14",
      width: 50,
      height: 50,
    });

    const i15 = graph.createNode({
      shape: "my-avatar15",
      width: 50,
      height: 50,
    });

    const i16 = graph.createNode({
      shape: "my-avatar16",
      width: 50,
      height: 50,
    });

    const k1 = graph.createNode({
      width: 100,
      height: 50,
      shape: 'html',
      html() {
        const wrap = document.createElement('img')
        wrap.style.width = '100%'
        wrap.style.height = '100%'
        return wrap
      },
    });

    const k2 = graph.createNode({
      width: 100,
      height: 50,
      shape: 'html',
      html() {
        const wrap = document.createElement('input')
        wrap.style.width = '100%'
        wrap.style.height = '100%'
        wrap.style.background = '#f0f0f0'
        wrap.style.textAlign = 'center'
        wrap.placeholder = '按钮文本'
        return wrap
      },
    });

    const k3 = graph.createNode({
      width: 50,
      height: 50,
      shape: 'html',
      html() {
        const wrap = document.createElement('hr')
        wrap.color = '#111'
        return wrap
      },
    });

    const k4 = graph.createNode({
      width: 100,
      height: 50,
      shape: 'html',
      html() {
        const wrap = document.createElement('input')
        wrap.style.width = '100%'
        wrap.style.height = '100%'
        wrap.style.textAlign = 'center'
        wrap.placeholder = '输入框'
        return wrap
      },
    });

    this.stencil.load([r1, r2, r5, r6, r3, r4, r8, r9, r10, r11, r12, r14], 'basic')
    this.stencil.load([i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15, i16], 'combination')
    this.stencil.load([r7, k4, k1, k2, k3], 'group')
  }
  //从data.ts读取JSON图的方式和修改data的方式在这
  private static initGraphShape(graphId) {
    console.log('id:',graphId)
    axios.get('/prototype/get', {
      params: {
        protoId: parseInt(graphId)
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
  }

}
