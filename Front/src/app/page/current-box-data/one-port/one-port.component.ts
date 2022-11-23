import { Component, Input, OnInit } from '@angular/core';
import { PortInterface } from 'src/app/models/box';
import { SensorInterface } from '../../../models/box';

@Component({
  selector: 'app-one-port',
  templateUrl: './one-port.component.html',
  styleUrls: ['./one-port.component.scss']
})
export class OnePortComponent implements OnInit {

  @Input() port: PortInterface;

  @Input() data: any;

  @Input() id: string;

  metrics

  constructor() { }

  ngOnInit(): void {
  }

  lastData(type: string) {
    if (this.data) {
      return this.data.measurements[this.data.measurements.length - 1][type]
    }
    return 0
  }

  getMetric() {
    return (this.port.device as SensorInterface).measurementParameters
  }

}
