import { Graph, Dom, Node } from '@antv/x6'
import '@antv/x6-vue-shape'
import Image from '@/components/Image.vue'
import avatar from '@/components/icon/avatar.vue'
import avatar2 from '@/components/icon/avatar2.vue'
import avatar3 from '@/components/icon/avatar3.vue'
import avatar4 from '@/components/icon/avatar4.vue'
import avatar5 from '@/components/icon/avatar5.vue'
import avatar6 from '@/components/icon/avatar6.vue'
import avatar7 from '@/components/icon/avatar7.vue'
import avatar8 from '@/components/icon/avatar8.vue'
import avatar9 from '@/components/icon/avatar9.vue'
import avatar10 from '@/components/icon/avatar10.vue'
import avatar11 from '@/components/icon/avatar11.vue'
import avatar12 from '@/components/icon/avatar12.vue'
import avatar13 from '@/components/icon/avatar13.vue'
import avatar14 from '@/components/icon/avatar14.vue'
import avatar15 from '@/components/icon/avatar15.vue'
import avatar16 from '@/components/icon/avatar16.vue'
import button from '@/components/button/button.vue'


Graph.registerNode('flow-chart-Rect', {
  inherit: 'rect',
  width: 80,
  height: 42,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: '#ffffff',
    },
    fo: {
      refWidth: '100%',
      refHeight: '100%',
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    'edit-text': {
      contenteditable: 'true',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(0,0,0,0.85)',
      },
    },
    text: {
      fontSize: 12,
      fill: '#080808',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'foreignObject',
      selector: 'fo',
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: 'body',
          selector: 'foBody',
          children: [
            {
              tagName: 'div',
              selector: 'edit-text',
            },
          ],
        },
      ],
    },
  ],
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  },
})

Graph.registerNode('flow-chart-Polygon', {
  inherit: 'polygon',
  width: 66,
  height: 36,
  attrs: {
    body: {
      strokeWidth: 1,
      stroke: '#5F95FF',
      fill: '#EFF4FF',
    },
    text: {
      fontSize: 12,
      fill: '#262626',
    },
  },
})

// Graph.registerVueComponent(
//     "image",
//     {
//       template: `<Image/>`,
//       components: {
//         Image,
//       },
//     },
//     true
// );

Graph.registerNode('my-avatar', {
  inherit: "vue-shape",
  component: {
    template: `<avatar />`,
    components: {
      avatar,
    },
  },
})

Graph.registerNode('my-avatar2', {
  inherit: "vue-shape",
  component: {
    template: `<avatar2 />`,
    components: {
      avatar2,
    },
  },
})

Graph.registerNode('my-avatar3', {
  inherit: "vue-shape",
  component: {
    template: `<avatar3 />`,
    components: {
      avatar3,
    },
  },
})

Graph.registerNode('my-avatar4', {
  inherit: "vue-shape",
  component: {
    template: `<avatar4 />`,
    components: {
      avatar4,
    },
  },
})

Graph.registerNode('my-avatar5', {
  inherit: "vue-shape",
  component: {
    template: `<avatar5 />`,
    components: {
      avatar5,
    },
  },
})

Graph.registerNode('my-avatar6', {
  inherit: "vue-shape",
  component: {
    template: `<avatar6 />`,
    components: {
      avatar6,
    },
  },
})

Graph.registerNode('my-avatar7', {
  inherit: "vue-shape",
  component: {
    template: `<avatar7 />`,
    components: {
      avatar7,
    },
  },
})

Graph.registerNode('my-avatar8', {
  inherit: "vue-shape",
  component: {
    template: `<avatar8 />`,
    components: {
      avatar8,
    },
  },
})

Graph.registerNode('my-avatar9', {
  inherit: "vue-shape",
  component: {
    template: `<avatar9 />`,
    components: {
      avatar9,
    },
  },
})

Graph.registerNode('my-avatar10', {
  inherit: "vue-shape",
  component: {
    template: `<avatar10 />`,
    components: {
      avatar10,
    },
  },
})

Graph.registerNode('my-avatar11', {
  inherit: "vue-shape",
  component: {
    template: `<avatar11 />`,
    components: {
      avatar11,
    },
  },
})

Graph.registerNode('my-avatar12', {
  inherit: "vue-shape",
  component: {
    template: `<avatar12 />`,
    components: {
      avatar12,
    },
  },
})

Graph.registerNode('my-avatar13', {
  inherit: "vue-shape",
  component: {
    template: `<avatar13 />`,
    components: {
      avatar13,
    },
  },
})

Graph.registerNode('my-avatar14', {
  inherit: "vue-shape",
  component: {
    template: `<avatar14 />`,
    components: {
      avatar14,
    },
  },
})

Graph.registerNode('my-avatar15', {
  inherit: "vue-shape",
  component: {
    template: `<avatar15 />`,
    components: {
      avatar15,
    },
  },
})

Graph.registerNode('my-avatar16', {
  inherit: "vue-shape",
  component: {
    template: `<avatar16 />`,
    components: {
      avatar16,
    },
  },
})

Graph.registerNode('my-button', {
  inherit: "vue-shape",
  component: {
    template: `<button />`,
    components: {
      button
    },
  },
})

Graph.registerNode('zzy-image', {
  inherit: 'rect',
  width: 200,
  height: 60,
  attrs: {
    image: {
      href: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      refWidth: '100%',
      refHeight: '100%',
    }
  },
  markup : [
    {
      tagName: 'image',
      selector: 'image',
    },
  ],
})

export const FlowChartImageRect = Graph.registerNode('flow-chart-image-Rect', {
  inherit: 'rect',
  width: 200,
  height: 60,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    image: {
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 16,
      height: 16,
      x: 12,
      y: 12,
    },
    title: {
      text: 'Node',
      refX: 40,
      refY: 14,
      fill: 'rgba(0,0,0,0.85)',
      fontSize: 12,
      'text-anchor': 'start',
    },
    text: {
      text: 'this is content text',
      refX: 40,
      refY: 38,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  ports: {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  },
})

export const FlowChartTitleRect = Graph.registerNode('icon', {
  inherit: 'rect',
  width: 200,
  height: 68,
  attrs: {
    image: {
      height: 16,
      x: 6,
      y: 6,
    },
  },
})

export const FlowChartAnimateText = Graph.registerNode('flow-chart-animate-Text', {
    inherit: 'rect',
    width: 200,
    height: 60,
    attrs: {
      body: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: 'rgba(95,149,255,0.05)',
      },
      text1: {
        class: 'animate-text1',
        text: 'AntV X6',
        fontSize: 32,
      },
      text2: {
        class: 'animate-text2',
        text: 'AntV X6',
        fontSize: 32,
      },
    },
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'text1',
      },
      {
        tagName: 'text',
        selector: 'text2',
      },
    ],
  },)

export class NodeGroup extends Node {
  private collapsed = true

  protected postprocess() {
    this.toggleCollapse(true)
  }

  isCollapsed() {
    return this.collapsed
  }

  toggleCollapse(collapsed?: boolean) {
    const target = collapsed == null ? !this.collapsed : collapsed
    if (target) {
      this.attr('buttonSign', { d: 'M 1 5 9 5 M 5 1 5 9' })
      this.resize(200, 40)
    } else {
      this.attr('buttonSign', { d: 'M 2 5 8 5' })
      this.resize(240, 240)
    }
    this.collapsed = target
  }
}

NodeGroup.config({
  shape: 'rect',
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'g',
      selector: 'buttonGroup',
      children: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            'pointer-events': 'visiblePainted',
          },
        },
        {
          tagName: 'path',
          selector: 'buttonSign',
          attrs: {
            fill: 'none',
            'pointer-events': 'none',
          },
        },
      ],
    },
  ],
  attrs: {
    body: {
      refWidth: '100%',
      refHeight: '100%',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
      stroke: '#5F95FF',
    },
    image: {
      'xlink:href':
        'https://gw.alipayobjects.com/mdn/rms_0b51a4/afts/img/A*X4e0TrDsEiIAAAAAAAAAAAAAARQnAQ',
      width: 16,
      height: 16,
      x: 8,
      y: 12,
    },
    text: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.85)',
      refX: 30,
      refY: 15,
    },
    buttonGroup: {
      refX: '100%',
      refX2: -25,
      refY: 13,
    },
    button: {
      height: 14,
      width: 16,
      rx: 2,
      ry: 2,
      fill: '#f5f5f5',
      stroke: '#ccc',
      cursor: 'pointer',
      event: 'node:collapse',
    },
    buttonSign: {
      refX: 3,
      refY: 2,
      stroke: '#808080',
    },
  },
})

Graph.registerNode('GroupNode', NodeGroup)
