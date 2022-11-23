import { IWidget, LGraphNode, LiteGraph, SerializedLGraphNode } from 'litegraph.js';
import { PortInterface } from 'src/app/models/box';
import { BasicNode } from "../basicNode";

export class Device extends BasicNode {
  ports: PortInterface[] = []

  comboSelectPort: IWidget<any>

  portSelected: number

  constructor(title: string) {
    super(title);

    this.properties = {
    };

    this.widgets_up = false;
  }

  init(ports: PortInterface[]) {
    this.ports = ports

    let value: string[] = ["None"]

    ports.forEach((port: PortInterface) => {
      value.push(port.pin + " " + port.name)
    })
    this.comboSelectPort = this.addWidget("combo", "Port", "None",
      (value, widget, node) => {
        if (value === this.portSelected || (this.portSelected === -1 && value === "None")) {
          return
        }
        if (value === "None") {
          this.portSelected = -1
          this.updateInAndOut()
        } else {
          var pin: number = +value.split(" ")[0]
          this.portSelected = pin
          this.updateInAndOut()
        }
      },
      { values: value });
  }

  updateInAndOut() {
    this.removeAllOutputs()
    this.removeAllInputs()
    if (this.portSelected !== -1) {
      let port = this.ports.find((value) => value.pin === this.portSelected)

      if (port.device.type === "sensor") {
        port.device.measurementParameters.forEach(element => {
          this.addOutput(element.name, element.dataType)
        });
      } else {
        this.addInput("activate", "boolean")
      }
    }
  }

  changePortSelected(newPort: number, updateLink: boolean = true) {
    this.portSelected = newPort
    if (newPort !== -1) {
      let port = this.ports.find((value) => value.pin === this.portSelected)
      this.comboSelectPort.value = port.pin + " " + port.name
    } else {
      this.comboSelectPort.value = "None"
    }
    if (updateLink)
      this.updateInAndOut()
  }

  override onExecute() {
  }

  override onPropertyChanged(name, value) {
  };

  override onSerialize(o: SerializedLGraphNode<LGraphNode>): void {
      o.properties = {portSelected: this.portSelected}
  }

  override onConfigure(o: SerializedLGraphNode<LGraphNode>): void {
    let properties = o.properties['portSelected']
    if (properties) {
      this.changePortSelected(properties, false)
    } else {
      this.changePortSelected(-1, true)
    }
    o.properties = {}
    this.properties = {};
  }
}
