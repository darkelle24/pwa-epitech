import { BasicNode } from "../basicNode";

export class Not extends BasicNode {
  static override path = "Condition/Not"
  static override titleContext = "Not"

  constructor() {
    super("Not");

    this.addInput("A", "boolean");

    this.properties = {
      A: false,
    };

    this.addOutput("Result", "boolean");
    //console.log("Created");
  }

  override onExecute = function () {
    var A = this.getInputData(0);

    if (A !== undefined) {
      this.properties["A"] = A;
    } else {
      A = this.properties["A"];
    }

    this.setOutputData(0, !A);
  }
}
