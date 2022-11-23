import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dot-indicator',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
export class DotComponent implements OnInit {

  @Input() width: number = 25
  @Input() height: number = 25
  @Input() connected: boolean = false
  @Input() working: boolean = false
  @Input() startOfTooltip: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

  tooltipString(): string {
    let toReturn = ''
    if (this.startOfTooltip) {
      toReturn = this.startOfTooltip
    } else {
      toReturn = 'It\'s'
    }
    if (this.connected && this.working) {
      toReturn += ' connected and working'
    } else if (this.connected && !this.working) {
      toReturn += ' connected but don\'t work'
    } else {
      toReturn += ' not connected'
    }
    return toReturn
  }

}
