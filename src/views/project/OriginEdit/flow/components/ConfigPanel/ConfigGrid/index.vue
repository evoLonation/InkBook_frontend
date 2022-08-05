<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane tab="网格" key="1">
      <a-row align="middle">
        <a-col :span=10>风格</a-col>
        <a-col :span=12>
          <a-select style="width: 100%" :value="globalGridAttr.type" @change="(val) => { globalGridAttr.type=val }">
            <a-select-option :value="GRID_TYPE.DOT">点阵</a-select-option>
            <a-select-option :value="GRID_TYPE.FIXED_DOT">小点阵</a-select-option>
            <a-select-option :value="GRID_TYPE.MESH">网格</a-select-option>
            <a-select-option :value="GRID_TYPE.DOUBLE_MESH">双重网格</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span=10>网格大小</a-col>
        <a-col :span=10>
          <a-slider :min=1 :max=20 :step=1 :value="globalGridAttr.size" @change="(val) => { globalGridAttr.size = val }"/>
        </a-col>
        <a-col :span=2>
          <div class="result">{{globalGridAttr.size}}</div>
        </a-col>
      </a-row>
      <div v-if="globalGridAttr.type === 'doubleMesh'">
        <a-row align="middle">
          <a-col :span=10>一层颜色</a-col>
          <a-col :span=12>
            <a-input
                type="color"
                :value="globalGridAttr.color"
                style="width: 100%"
                @change="(e) => { globalGridAttr.color = e.target.value }"
            />
          </a-col>
        </a-row>
        <a-row align="middle">
          <a-col :span=10>一层厚度</a-col>
          <a-col :span=10>
            <a-slider :min=0.5 :max=10 :step=0.5 :value="globalGridAttr.thickness" @change="(val) => { globalGridAttr.thickness = val }"/>
          </a-col>
          <a-col :span=2>
            <div class="result">{{ globalGridAttr.thickness.toFixed(1) }}</div>
          </a-col>
        </a-row>
        <a-row align="middle">
          <a-col :span=10>二层颜色</a-col>
          <a-col :span=12>
            <a-input type="color" :value="globalGridAttr.colorSecond" style="width: 100%" @change="(e) => { globalGridAttr.colorSecond = e.target.value }"/>
          </a-col>
        </a-row>
        <a-row align="middle">
          <a-col :span=10>二层厚度</a-col>
          <a-col :span=10>
            <a-slider
                :min=0.5
                :max=10
                :step=0.5
                :value="globalGridAttr.thicknessSecond"
                @change="(val) => { globalGridAttr.thicknessSecond = val }"
              />
          </a-col>
          <a-col :span=2>
            <div class="result">{{ globalGridAttr.thicknessSecond.toFixed(1) }}</div>
          </a-col>
        </a-row>
        <a-row align="middle">
          <a-col :span=10>缩放</a-col>
          <a-col :span=10>
            <a-slider
                :min=1
                :max=10
                :step=1
                :value="globalGridAttr.factor"
                @change="(val) => {globalGridAttr.factor = val}"
              />
          </a-col>
          <a-col :span=2>
            <div class="result">{{ globalGridAttr.factor }}</div>
          </a-col>
        </a-row>
      </div>
      <div v-else>
        <a-row align="middle">
          <a-col :span=10>网格颜色</a-col>
          <a-col :span=12>
            <a-input type="color" :value="globalGridAttr.color" style="width: 100%" @change="(e) => { globalGridAttr.color = e.target.value }" />
          </a-col>
        </a-row>
        <a-row align="middle">
          <a-col :span=10>厚度</a-col>
          <a-col :span=10>
            <a-slider :min=0.5 :max=10 :step=0.5 :value="globalGridAttr.thickness" @change="(val) => { globalGridAttr.thickness = val }"/>
          </a-col>
          <a-col :span=1>
            <div class="result">{{globalGridAttr.thickness.toFixed(1)}}</div>
          </a-col>
        </a-row>
      </div>
    </a-tab-pane>

    <a-tab-pane tab="背景" key="2">
      <a-row align="middle">
        <a-col :span=6>颜色</a-col>
        <a-col :span=14>
          <a-input type="color" :value="globalGridAttr.bgColor" style= "width: 100%" @change="(e) => { globalGridAttr.bgColor = e.target.value }"/>
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="14" :offset="6">
          <a-checkbox :checked="globalGridAttr.showImage" @change="(e) => { globalGridAttr.showImage = e.target.checked }">
          显示背景
          </a-checkbox>
        </a-col>
      </a-row>
      <div v-if="globalGridAttr.showImage">
        <a-row align="middle">
          <a-col :span=6>设置重复</a-col>
          <a-col :span=14>
            <a-select style="width: 100%" :value="globalGridAttr.repeat" @change="(val) => { globalGridAttr.repeat = val }">
              <a-select-option :value="REPEAT_TYPE.NO_REPEAT">不重复</a-select-option>
              <a-select-option :value="REPEAT_TYPE.REPEAT">重复</a-select-option>
              <a-select-option :value="REPEAT_TYPE.REPEAT_X">左右重复</a-select-option>
              <a-select-option :value="REPEAT_TYPE.REPEAT_Y">上下重复</a-select-option>
              <a-select-option :value="REPEAT_TYPE.ROUND">环绕</a-select-option>
              <a-select-option :value="REPEAT_TYPE.SPACE">空间</a-select-option>
              <a-select-option :value="REPEAT_TYPE.FLIPX">左右翻转</a-select-option>
              <a-select-option :value="REPEAT_TYPE.FLIPY">上下翻转</a-select-option>
              <a-select-option :value="REPEAT_TYPE.FLIPXY">翻转</a-select-option>
              <a-select-option :value="REPEAT_TYPE.WATERMARK">水印风格</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <div v-if="globalGridAttr.repeat === 'watermark'">
          <a-row align="middle">
            <a-col :span=16 :offset=6 style="font-size: 12px">
              水印角度
            </a-col>
            <a-col :span=14 :offset=6>
              <a-slider :min=0 :max=360 :step=1 :value="globalGridAttr.angle" @change="(val) => { globalGridAttr.angle = val }"/>
            </a-col>
            <a-col :span=2>
              <div class="result">{{globalGridAttr.angle}}</div>
            </a-col>
          </a-row>
        </div>

        <a-row align="middle">
          <a-col :span=6>位置</a-col>
          <a-col :span=14>
            <a-select style="width: 100%" :value="globalGridAttr.position" @change="(val) => { globalGridAttr.position = val }">
            <a-select-option value="center">居中</a-select-option>
            <a-select-option value="left">左对齐</a-select-option>
            <a-select-option value="right">右对齐</a-select-option>
            <a-select-option value="top">顶部</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row align="middle">
          <a-col :span=6>大小</a-col>
          <a-col :span=14>
            <a-select style="width: 100%" :value="globalGridAttr.bgSize" @change="(val) => {globalGridAttr.bgSize = val}" >
            <a-select-option value="auto auto">自动</a-select-option>
            <a-select-option value="cover">覆盖</a-select-option>
            <a-select-option value="contain">包含</a-select-option>
<!--            <a-select-option value="100% 100%">100% 100%</a-select-option>-->
<!--            <a-select-option :value="JSON.stringify({ width: 150, height: 150 })">-->
<!--              {`{width: 150, height: 150 }`}-->
<!--            </a-select-option>-->
            </a-select>
          </a-col>
        </a-row>
        <a-row align="middle">
          <a-col :span=6>透明度</a-col>
          <a-col :span=12>
            <a-slider
                :min=0.05
                :max=1
                :step=0.05
                :value="globalGridAttr.opacity"
                @change="(val) => {globalGridAttr.opacity = val}"
              />
          </a-col>
          <a-col :span=4>
            <div class="result">{{ globalGridAttr.opacity.toFixed(2) }}</div>
          </a-col>
        </a-row>


      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, watch} from "vue";
// import FlowGraph from '@/views/graph'

import { gridOpt,backGroundOpt,gridSizeOpt } from './method'

enum GRID_TYPE_ENUM {
  DOT = 'dot',
  FIXED_DOT = 'fixedDot',
  MESH = 'mesh',
  DOUBLE_MESH = 'doubleMesh',
}

enum REPEAT_TYPE_ENUM {
  NO_REPEAT = 'no-repeat',
  REPEAT = 'repeat',
  REPEAT_X = 'repeat-x',
  REPEAT_Y = 'repeat-y',
  ROUND = 'round',
  SPACE = 'space',
  FLIPX = 'flipX',
  FLIPY = 'flipY',
  FLIPXY = 'flipXY',
  WATERMARK = 'watermark',
}




export default defineComponent({
  name: "index",
  setup(){
    const GRID_TYPE = reactive(GRID_TYPE_ENUM)
    const REPEAT_TYPE = reactive(REPEAT_TYPE_ENUM)
    const globalGridAttr: any = inject('globalGridAttr')

    gridOpt(globalGridAttr)
    gridSizeOpt(globalGridAttr)
    backGroundOpt(globalGridAttr)

    // 监听网格变化
    watch([
      ()=>globalGridAttr.type,
      ()=>globalGridAttr.color,
      ()=>globalGridAttr.thickness,
      ()=>globalGridAttr.thicknessSecond,
      ()=>globalGridAttr.colorSecond,
      ()=>globalGridAttr.factor
    ], ()=>{ gridOpt(globalGridAttr) },{
      immediate:false,
      deep:false
    })

    // 监听网格大小变化
    watch([()=>globalGridAttr.size],()=>{
      gridSizeOpt(globalGridAttr)
    },{
      immediate:false,
      deep:false
    })

    // 监听背景变化
    watch([
      ()=>globalGridAttr.bgColor,
      ()=>globalGridAttr.showImage,
      ()=>globalGridAttr.repeat,
      ()=>globalGridAttr.angle,
      ()=>globalGridAttr.bgSize,
      ()=>globalGridAttr.position,
      ()=>globalGridAttr.opacity,
    ],() => {
      backGroundOpt(globalGridAttr)
    },{
      immediate:false,
      deep:false
    })

    return{
      GRID_TYPE,
      REPEAT_TYPE,
      globalGridAttr
    }
  }
})
</script>

<style lang="less" scoped>

</style>
