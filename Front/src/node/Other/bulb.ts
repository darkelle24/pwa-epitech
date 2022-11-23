import { LiteGraph } from "litegraph.js";
import { BasicNode } from "../basicNode";

export class Bulb extends BasicNode {
  static override path = "Other/Bulb"
  static override titleContext = "Bulb"

  value: boolean
  img: HTMLImageElement

  constructor() {
    super("Bulb");
    this.size = [200, 200];
    this.resizable = false
    this.addInput("value", 'boolean', { label: "" });
    this.properties = {
      value: false
    }
    this.title = "Bulb"
    this.img = (this.loadImage('../../assets/bulb_off.png') as unknown as HTMLImageElement)
  }

  override onExecute() {
    var A = this.getInputData(0);

    if (A !== this.properties["value"]) {
      if (A)
        this.img = (this.loadImage('../../assets/bulb_on.png') as unknown as HTMLImageElement)
      else
        this.img = (this.loadImage('../../assets/bulb_off.png') as unknown as HTMLImageElement)
    }

    if (A !== undefined) {
      this.properties["value"] = A;
    } else {
      A = this.properties["value"];
    }
  };

  override onDrawForeground(ctx) {
    if (this.flags.collapsed) {
      return;
    }

    if (this.img && this.size[0] > 5 && this.size[1] > 5 && this.img.width) {
      this.size[0] = 100
      this.size[1] = 150
      ctx.drawImage(this.img, 1, 0, this.size[0], this.size[1]);
    }
  };


}
