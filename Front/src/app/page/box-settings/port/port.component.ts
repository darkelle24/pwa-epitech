import { PortDialogService } from './../../../dialogs/port-dialog/port-dialog.service';
import { PortInterface } from './../../../models/box';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-port',
  templateUrl: './port.component.html',
  styleUrls: ['./port.component.scss']
})
export class PortComponent implements OnInit {

  @Input() port: PortInterface;

  @Input() id: string;

  constructor(private portDialog: PortDialogService) { }

  ngOnInit(): void {
  }

  valueReturn() {
    if (this.port.device && this.port.device.type === "sensor") {
      return this.port.device.measurementParameters.map((value) => value.name).join(', ')
    }
    return ''
  }

  open() {
    this.portDialog.open({ port: this.port, idBox: this.id })
    this.portDialog.confirmed().subscribe({
      next: (value) => {
        if (value) {
          this.port = value
        }
      }
    })
  }

}
