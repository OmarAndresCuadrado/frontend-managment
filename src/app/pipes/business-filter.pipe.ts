import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'businessFilter'
})
export class BusinessFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
