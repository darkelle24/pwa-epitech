import { IWidget } from "litegraph.js";
import { BasicNode } from "../basicNode";

export class LogicGate extends BasicNode {
  static override path = "Condition/Logic Gate"
  static override titleContext = "Logic Gate"

  differentType: string[] = ["AND", "OR", "XOR"]

  combo: IWidget<any>

  constructor() {
    super("Logic Gate");

    this.addInput("A", "boolean");
    this.addInput("B", "boolean");

    this.properties = {
      A: false,
      B: false,
      logicType: 'AND'
    };

    this.addOutput("Result", "boolean");

    this.combo = this.addWidget("combo", "Comparator", "AND",
      (value, widget, node) => {
        this.properties["logicType"] = value;
      },
      { values: this.differentType }
    );
    this.title = this.properties["logicType"]
    console.log("Created");
  }

  override onPropertyChanged(name, value) {
    if (name == "logicType") {
      if (this.differentType.find(element => element === value))
        this.combo.value = value;
      else {
        value = 'AND'
        this.combo.value = 'AND'
        this.properties["logicType"] = 'AND'
      }
      this.title = this.properties["logicType"]
    }
  };

  override getTitle() {
    if (this.flags.collapsed) {
      return this.properties["logicType"]
    }
    return this.properties["logicType"]
  };

  override onExecute = function () {
    var A = this.getInputData(0);
    var B = this.getInputData(1);
    if (A !== undefined) {
      this.properties["A"] = A;
    } else {
      A = this.properties["A"];
    }

    if (B !== undefined) {
      this.properties["B"] = B;
    } else {
      B = this.properties["B"];
    }

    let value: boolean = false

    switch (this.properties["logicType"]) {
      case "AND":
        value = A && B;
        break;
      case "XOR":
        value = ((A || B) && !(A && B));
        break;
      case "OR":
        value = A || B;
        break;
      default:
        value = A && B;
        break;
    }
    this.setOutputData(0, value);
  };
}
