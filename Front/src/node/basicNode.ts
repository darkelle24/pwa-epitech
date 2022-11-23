import { INodeOutputSlot, LGraphNode, LiteGraph, INodeInputSlot } from 'litegraph.js';

export class BasicNode extends LGraphNode {
  static path: string
  static titleContext: string

  constructor(title?: string) {
    super(title);
  }

  override addInput(name: string, type: string | -1, extra_info?: Partial<INodeOutputSlot>): INodeInputSlot {
    let extra_info_my = this.detectDefineTypeSlot(type, extra_info)
    return super.addInput(name, type, extra_info_my)
  }

  override addOutput(name: string, type: string | -1, extra_info?: Partial<INodeOutputSlot>): INodeOutputSlot {
    let extra_info_my = this.detectDefineTypeSlot(type, extra_info)
    return super.addOutput(name, type, extra_info_my)
  }

  private detectDefineTypeSlot(type: string | -1, extra_info?: Partial<INodeOutputSlot>): Partial<INodeOutputSlot> | undefined {
    let extra_info_my = extra_info

    if (type === "boolean") {
      if (!extra_info_my) {
        extra_info_my = {}
      }
      extra_info_my.shape = LiteGraph.BOX_SHAPE
    }

    return extra_info_my
  }

  removeAllInputs() {
    let map = this.inputs.map((element, index) => {
      return index;
    });

    map.forEach(element => {
      this.removeInput(0)
    });
  }

  removeAllOutputs() {
    let map = this.outputs.map((element, index) => {
      return index;
    });

    map.forEach(element => {
      this.removeOutput(0)
    });
  }
}
