import { Component, isDevMode } from '@angular/core';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    if (!isDevMode() && !environment.authRequired) {
      console.warn('Be careful authRequired is not activated in prod mode.')
    } else if (isDevMode()) {
      let toShow = environment

      toShow.production = !isDevMode()
      if (isDevMode()) {
        console.log(toShow)
      }
    }
  }
}
