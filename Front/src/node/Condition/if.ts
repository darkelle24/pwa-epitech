import { BasicNode } from "../basicNode";

export class If extends BasicNode {
  static override path = "Condition/If"
  static override titleContext = "If"

  constructor() {
    super("If");

    this.addInput("condition", "boolean");

    this.properties = {
    };

    this.addOutput("true", "boolean");
    this.addOutput("false", "boolean");
    //console.log("Created");
  }

  override setValue(value: string) {
  }

  override onExecute = function () {
    var A = this.getInputData(0);

    if (A) {
      this.setOutputData(0, true);
      this.setOutputData(1, false);
    } else {
      this.setOutputData(0, false);
      this.setOutputData(1, true);
    }
  };
}
