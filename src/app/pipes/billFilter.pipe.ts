import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billFilter'
})
export class BillFilterPipe implements PipeTransform {

  transform(value: any[], arg: any): any {
    const resultBills = [];

    if (arg === '' || arg.length < 2) { return value }

    value.forEach((object) => {
      if ((object.description.toUpperCase().indexOf(arg.toUpperCase()) > -1))
        resultBills.push(object);
    })
    return resultBills;
  }

}
