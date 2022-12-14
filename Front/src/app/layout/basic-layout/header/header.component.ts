import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FindRouteData } from 'src/app/abstract-components/find-route-data.directive';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends FindRouteData implements OnDestroy {

  secondHeader: boolean = false

  constructor(activatedRoute: ActivatedRoute, router: Router) {
    super(activatedRoute, router)
    this.activatedGetAllRouteData((data: Data) => {this.routedData(data)})
  }

  routedData(data: Data) {
    if (!data['secondHeader']) {
      this.secondHeader = false
    } else {
      this.secondHeader = data['secondHeader']
    }
    console.log(this.secondHeader)
  }

  goTo(link: string) {
    this.router.navigate([link]);
  }

}
