import { Component, Input, isDevMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClotheInterface } from 'src/app/models/box';
import { environment } from 'src/environments/environment';

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

  getImageUrl() {
    if (this.clothe.picture && this.clothe.picture.id) {
      return environment.apiUrl + '/files/show/' + this.clothe.picture.id
    } else {
      return ''
    }
  }

  handleFav() {

  }

  goTo(event: MouseEvent) {
    event.stopPropagation()
    if (isDevMode()) {
      console.log(this.clothe)
      console.log(['/clothe/', this.clothe.id])
    }
    this.router.navigate(['/clothe/' + this.clothe.id])
  }

}
