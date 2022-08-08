import FlowGraph from "@/views/project/UMLEdit/flow/graph";
import store from "@/store"

export function gridOpt(globalGridAttr: any){
    let options
    if (globalGridAttr.type === 'doubleMesh') {
        options = {
            type: globalGridAttr.type,
            args: [
                {
                    color: globalGridAttr.color,
                    thickness: globalGridAttr.thickness,
                },
                {
                    color: globalGridAttr.colorSecond,
                    thickness: globalGridAttr.thicknessSecond,
                    factor: globalGridAttr.factor,
                },
            ],
        }
    } else {
        options = {
            type: globalGridAttr.type,
            args: [
                {
                    color: globalGridAttr.color,
                    thickness: globalGridAttr.thickness,
                },
            ],
        }
    }
    const { graph } = FlowGraph
    graph.drawGrid(options)
}

export function gridSizeOpt(globalGridAttr: any){
    const { graph } = FlowGraph
    graph.setGridSize(globalGridAttr.size)
}


const tryToJSON = (val: string) => {
    try {
        return JSON.parse(val)
    } catch (error) {
        return val
    }
}


export function backGroundOpt(globalGridAttr: any){
    const url = 'http://43.138.71.108/api/user/get-avatar/?userId=' + store.state.loginUser.userId
    const options = {
        color: globalGridAttr.bgColor,
        image: globalGridAttr.showImage? require('../../../../../../../assets/logo.png') : undefined,
        repeat: globalGridAttr.repeat,
        angle: globalGridAttr.angle,
        size: tryToJSON(globalGridAttr.bgSize),
        position: tryToJSON(globalGridAttr.position),
        opacity: globalGridAttr.opacity,
    }
    const { graph } = FlowGraph
    graph.drawBackground(options)
}
