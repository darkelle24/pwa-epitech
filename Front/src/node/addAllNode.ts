import { isDevMode } from "@angular/core";
import { LiteGraph } from "litegraph.js";
import * as nodes from "./";

export function addAllNode() {
  LiteGraph.clearRegisteredTypes()
  if (isDevMode()) {
    console.log('register')
  }
  Object.entries(nodes).forEach(([key, value]) => {
    if (!value.path) {
      console.warn('Can\'t load this node, missing path')
    } else {
      value.title = value.titleContext
      LiteGraph.registerNodeType(value.path, value);
    }
  });
}
