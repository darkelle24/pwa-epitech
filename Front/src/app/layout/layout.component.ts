import { isDevMode } from '@angular/core';
import { Component} from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FindRouteData } from '../abstract-components/find-route-data.directive';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends FindRouteData {

  layout: string = ''

  constructor(activatedRoute: ActivatedRoute, router: Router) {
    super(activatedRoute, router)
    this.activatedGetAllRouteData((data: Data) => {this.routedData(data)})
  }

  routedData(data: Data) {
    if (!data['layout']) {
      console.error('need to define layout')
      this.layout = ''
    } else {
      this.layout = data['layout']
    }
    this.setLayout(this.layout)
    if (isDevMode()) {
      console.log(this.layout)
    }
  }

  setLayout(layout: string) {
    this.layout = layout
  }

  test() {
    if (isDevMode()) {
      console.log(this.layout)
    }
  }

}

