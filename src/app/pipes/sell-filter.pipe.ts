import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sellFilter'
})
export class SellFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
