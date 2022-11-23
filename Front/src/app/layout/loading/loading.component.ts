import { isDevMode } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loadingRouteConfig: boolean;

    constructor (private router: Router) {}

  ngOnInit() {
    if (isDevMode()) {
      console.log('Reinit loading bar')
    }
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        if (isDevMode()) {
          console.log('Start Loading')
        }
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        if (isDevMode()) {
          console.log('End Loading')
        }
        this.loadingRouteConfig = false;
      }
    });
  }

}
