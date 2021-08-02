import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
