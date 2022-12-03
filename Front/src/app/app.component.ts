import { Component, isDevMode } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    if (!isDevMode() && !environment.authRequired) {
      console.warn('Be careful authRequired is not activated in prod mode.')
    } else if (isDevMode()) {
      let toShow = environment

      toShow.production = !isDevMode()
      if (isDevMode()) {
        console.log(toShow)
      }
    }

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("New version available. Load New Version?")) {

              window.location.reload();
          }
      });
    }
  }
}
