import { ApplicationRef, Component, isDevMode } from '@angular/core';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';
import { concat, filter, first, interval } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { NotificationService } from './core/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(appRef: ApplicationRef, private swUpdate: SwUpdate, private toastr: ToastrService, private not: NotificationService) {
    if (!isDevMode() && !environment.authRequired) {
      console.warn('Be careful authRequired is not activated in prod mode.')
    } else if (isDevMode()) {
      let toShow = environment

      toShow.production = !isDevMode()
      if (isDevMode()) {
        console.log(toShow)
      }
    }

    //this.not.subscribeToNotifications()

    if (this.swUpdate.isEnabled) {
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const everySixHours$ = interval(20000);
      const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

      everySixHoursOnceAppIsStable$.subscribe(async () => {
        try {
          const updateFound = await this.swUpdate.checkForUpdate();
          if (isDevMode() && updateFound) {
            console.log('A new version is available.');
          }
        } catch (err) {
          console.error('Failed to check for updates:', err);
          this.toastr.error('Failed to check for updates:' + err.message)
        }
      });

      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(evt => {
          if(confirm("New version available. Load New Version?")) {

            window.location.reload();
          } else {
            console.log("User cancel maj.")
          }
        });
    }
  }
}
