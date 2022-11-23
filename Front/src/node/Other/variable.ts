import { IWidget } from "litegraph.js";
import { BasicNode } from "../basicNode";

export class Variable extends BasicNode {
  static override path = "Other/Variable"
  static override titleContext = "Variable"

  widget: IWidget<any>

  constructor() {
    super("Variable");
    this.addOutput("value", "number");

    this.properties = {
      value: 1,
    };

    this.widget = this.addWidget("number", "value", 1, "value");
    this.widgets_up = true;
    this.size = [180, 30];

    //console.log("Created");
  }

  override setValue(n: number) {
    this.properties["value"] = n;
    this.widget.value = n
  }

  override onExecute() {
    this.setOutputData(0, parseFloat(this.properties["value"]));
  };

  override getTitle() {
    if (this.flags.collapsed) {
      return this.properties["value"];
    }
    return this.title;
  };

  override onPropertyChanged(name, value) {
    if (name == "value") {
      this.widget.value = value;
    }
  };

  override onDrawBackground(ctx) {
    this.outputs[0].label = this.properties["value"].toFixed(3);
  };
}
