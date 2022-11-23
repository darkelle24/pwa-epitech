import { NgModule } from '@angular/core';
import { ModelDeviceTypeFilterPipe } from './model-device-type-filter.pipe';


@NgModule({
  declarations: [ModelDeviceTypeFilterPipe],
  exports: [
    ModelDeviceTypeFilterPipe
  ]
})
export class ModelDeviceTypeFilterModule { }
