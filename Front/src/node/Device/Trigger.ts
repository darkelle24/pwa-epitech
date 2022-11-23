import { IWidget } from "litegraph.js";
import { Device } from "./Device";

export class Trigger extends Device {
  static override path = "Device Type/Trigger"
  static override titleContext = "Trigger"

  constructor() {
    super("Trigger");
  }

  override onExecute() {
  }

  override onPropertyChanged(name, value) {
  };
}
