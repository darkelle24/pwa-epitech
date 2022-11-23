import { Component, Input, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BoxInterface } from 'src/app/models/box';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {
  @Input() box: BoxInterface;

  panelOpenState = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (isDevMode()) {
      console.log(this.box)
    }
  }

  goToBox(event: MouseEvent, url: string) {
    event.stopPropagation()
    if (isDevMode()) {
      console.log(this.box)
      console.log(['/box', this.box._id, url])
    }
    this.router.navigate(['/box/' + this.box._id + url])
  }

}
