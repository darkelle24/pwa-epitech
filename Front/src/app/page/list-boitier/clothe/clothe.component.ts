import { Component, Input, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClotheInterface } from 'src/app/models/box';

@Component({
  selector: 'app-clothe',
  templateUrl: './clothe.component.html',
  styleUrls: ['./clothe.component.scss']
})
export class ClotheComponent implements OnInit {

  @Input() clothe: ClotheInterface;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (isDevMode()) {
      console.log(this.clothe)
    }
  }

  goTo(event: MouseEvent, url: string) {
    event.stopPropagation()
    if (isDevMode()) {
      console.log(this.clothe)
      console.log(['/clothe', this.clothe.id, url])
    }
    this.router.navigate(['/box/' + this.clothe.id + url])
  }

}
