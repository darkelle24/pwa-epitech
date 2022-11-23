import { Pipe, PipeTransform } from '@angular/core';
import { SensorInterface, TriggerInterface } from 'src/app/models/box';

@Pipe({
  name: 'modelDeviceTypeFilter',
  pure: true
})
export class ModelDeviceTypeFilterPipe implements PipeTransform {

  transform(items: (SensorInterface | TriggerInterface)[], filter: "sensor" | "trigger", portocol: string[]): any {
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => item.type === filter && portocol.find((value) => value === item.protocol));
  }

}
