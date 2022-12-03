import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FindRouteData } from 'src/app/abstract-components/find-route-data.directive';
import { NotificationService } from 'src/app/core/notification/notification.service';

@Component({
  selector: 'basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent extends FindRouteData implements OnDestroy {

  fullScreen: boolean = false

  constructor(activatedRoute: ActivatedRoute, router: Router, private not: NotificationService) {
    super(activatedRoute, router)
    this.activatedGetAllRouteData((data: Data) => { this.routedData(data) })
    this.not.subscribeToNotifications()
  }

  routedData(data: Data) {
    if (!data['fullScreen']) {
      this.fullScreen = false
    } else {
      this.fullScreen = data['fullScreen']
    }
  }

}
