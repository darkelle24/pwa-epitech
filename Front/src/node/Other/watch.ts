import { BasicNode } from "../basicNode";

export class Watch extends BasicNode {
  static override path = "Other/Watch"
  static override titleContext = "Watch"

  value: number

  constructor() {
    super("Watch");
    this.size = [60, 30];
    this.addInput("value", 'string,number,array,boolean', { label: "" });
    this.value = 0;
  }

  override onExecute() {
    if (this.inputs[0]) {
      this.value = this.getInputData(0);
    }
  }

  override getTitle(): string {
    if (this.flags.collapsed) {
      return this.inputs[0].label;
    }
    return this.title;
  }

  override toString(o?: any): string {
    if (o == null) {
      return "null";
    } else if (o.constructor === Boolean) {
      return o.toString()
    } else if (o.constructor === Number) {
      return o.toFixed(3);
    } else if (o.constructor === Array) {
      var str = "[";
      for (var i = 0; i < o.length; ++i) {
        str += this.toString(o[i]) + (i + 1 != o.length ? "," : "");
      }
      str += "]";
      return str;
    } else {
      return String(o);
    }
  }

  override onDrawBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    this.inputs[0].label = this.toString(this.value);
  }
}
