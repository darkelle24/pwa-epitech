import { IWidget, LiteGraph } from 'litegraph.js';
import { Device } from './Device';

export class Sensor extends Device {
  static override path = "Device Type/Sensor"
  static override titleContext = "Sensor"

  constructor() {
    super("Sensor");
  }

  override onExecute() {
  }

  override onPropertyChanged(name, value) {
  };
}
