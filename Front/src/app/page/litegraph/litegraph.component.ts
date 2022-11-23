import { LitegraphService } from './litegraph.service';
import { AfterViewInit, Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LGraphCanvas, LGraph, LiteGraph } from 'litegraph.js';
import { FakeBox, PortInterface } from 'src/app/models/box';
import { addAllNode } from 'src/node/addAllNode';
import { Device } from 'src/node/Device/Device';
import { Sensor } from 'src/node/Device/Sensor';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { isDevMode } from '@angular/core';

@Component({
  selector: 'app-litegraph',
  templateUrl: './litegraph.component.html',
  styleUrls: ['./litegraph.component.scss']
})
export class LitegraphComponent implements OnInit, AfterViewInit, OnDestroy {

  graph: LGraph

  graphcanvas: LGraphCanvas

  ports: PortInterface[] = FakeBox.ports

  sub: Subscription

  id: string

  isLoading: boolean = true

  constructor(private titleService: Title, private zone: NgZone, private service: LitegraphService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.titleService.setTitle('Schema Box 1 | Clepsydre')

    this.zone.runOutsideAngular(() => { this.setUpLitegraph() })

    this.sub = this.activatedRoute.params.subscribe(s => {
      if (isDevMode()) {
        console.log(s)
      }
      this.getData(s['boxId'])
      this.id = s['boxId']
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  setUpLitegraph() {
    this.graph = new LGraph();

    this.graph.onNodeAdded = (node) => {
      if (node instanceof Device) {
        let type = "trigger"
        if (node instanceof Sensor) {
          type = "sensor"
        }
        let map = this.ports.filter((port) => {
          if (port.device && port.device.type === type) {
            return true
          }
          return false
        })
        node.init(map)
      }
    }

    this.graphcanvas = new LGraphCanvas("#mycanvas", this.graph);

    addAllNode()

    //this.graph.start();
    //graph.runStep()
  }

  ngAfterViewInit() {
    this.graphcanvas.resize()
    setTimeout(() => {
      this.graphcanvas.resize()
    })

    window.addEventListener('resize', () => {
      this.graphcanvas.resize()
      setTimeout(() => {
        this.graphcanvas.resize()
      })
    })
  }

  deploy() {
    this.isLoading = true
    this.graph.updateExecutionOrder()
    let graph = this.graph.serialize()
    graph.nodes = graph.nodes.sort((a: any, b: any) => a.order - b.order)
    if (isDevMode()) {
      console.log(graph)
      console.log(JSON.stringify(graph))
    }
    this.service.setGraph(this.id, graph).subscribe({
      next: (value) => {
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
      },
    })
  }

  downloadBlueprint() {
    this.getGraph(this.id)
  }

  tuto() {
  }

  clear() {
    this.graph.clear();
    //this.graph.start()
  }

  getData(id: string) {
    this.service.getBoxe(id).subscribe({
      next: (value) => {
        this.ports = value.ports
        this.getGraph(id)
      },
      error: (err) => {
        this.ports = []
        this.isLoading = false
      },
    })
  }

  getGraph(id: string) {
    this.isLoading = true
    this.service.getGraph(id).subscribe({
      next: (value) => {
        if (value.graphRaw)
          this.graph.configure(JSON.parse(value.graphRaw), false)
        this.isLoading = false
      },
      error: (err) => {
        this.isLoading = false
      },
    })
  }

}
