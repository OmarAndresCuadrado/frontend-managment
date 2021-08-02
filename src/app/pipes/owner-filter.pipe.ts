import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ownerFilter'
})
export class OwnerFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
