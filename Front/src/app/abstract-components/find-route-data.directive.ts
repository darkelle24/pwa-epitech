import { isDevMode } from "@angular/core";
import { Directive, OnDestroy } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Data, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Directive()
export class FindRouteData implements OnDestroy {
  saveSub: Subscription

  constructor(public activatedRoute: ActivatedRoute, public router: Router) {
  }

  activatedGetAllRouteData(routedData: (data: Data) => void) {
    this.getAllData(this.activatedRoute.snapshot, routedData)
    this.saveSub = this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd)
          this.getAllData(this.activatedRoute.snapshot, routedData)
      },
    })
  }

  private getAllData(currentSnapshot: ActivatedRouteSnapshot, routedData: (data: Data) => void) {
    let data = currentSnapshot.data
    let child: ActivatedRouteSnapshot = currentSnapshot.firstChild

    while (child) {
      data = { ...data, ...child.data }
      child = child.firstChild
    }
    if (isDevMode()) {
      console.log(data)
    }
    routedData(data)
  }

  ngOnDestroy(): void {
    this.saveSub.unsubscribe()
  }
}
