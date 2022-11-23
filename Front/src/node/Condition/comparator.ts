import { IWidget } from "litegraph.js";
import { BasicNode } from "../basicNode";

export class Comparator extends BasicNode {
  static override path = "Condition/Comparator"
  static override titleContext = "Comparator"

  differentType: string[] = [">", ">=", "<", "<=", "==", "!="]

  combo: IWidget<any>

  constructor() {
    super("Comparator");

    this.addInput("A", "number");
    this.addInput("B", "number");

    this.properties = {
      A: 0,
      B: 0,
      compareType: '>'
    };

    this.addOutput("Result", "boolean");

    this.combo = this.addWidget("combo", "Comparator", ">",
      (value, widget, node) => {
        this.properties["compareType"] = value;
      },
      { values: this.differentType }
    );
    this.title = "A " + this.properties["compareType"] + " B"
    //console.log("Created");
  }

  override setValue(value: string) {
    if (this.differentType.find(element => element === value)) {
      this.combo.value = value;
      this.properties["compareType"] = value
    } else {
      value = '>'
      this.combo.value = '>'
      this.properties["compareType"] = '>'
    }
    this.title = "A " + this.properties["compareType"] + " B"
  }

  override onPropertyChanged(name, value) {
    if (name == "compareType") {
      if (this.differentType.find(element => element === value)) {
        this.combo.value = value;
        this.properties["compareType"] = value
      } else {
        value = '>'
        this.combo.value = '>'
        this.properties["compareType"] = '>'
      }
      this.title = "A " + this.properties["compareType"] + " B"
    }
  };

  override getTitle() {
    if (this.flags.collapsed) {
      return "A " + this.properties["compareType"] + " B";
    }
    return "A " + this.properties["compareType"] + " B";
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

    switch (this.properties["compareType"]) {
      case ">":
        value = A > B;
        break;
      case ">=":
        value = A >= B;
        break;
      case "<=":
        value = A <= B;
        break;
      case "<":
        value = A < B;
        break;
      case "!=":
        value = A != B;
        break;
      case "==":
        value = A == B;
        break;
      default:
        value = A > B;
        break;
    }
    this.setOutputData(0, value);
  };
}
