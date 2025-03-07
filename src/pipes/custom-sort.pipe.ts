import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSort',
  pure: false
})
export class CustomSortPipe implements PipeTransform {

  sortArray(arr: any, params: any) {
    return arr.sort((a:any, b: any) => {
      const keyName: any = params.replace('-','');
      const aType = typeof(a[keyName]);
      const bType = typeof(b[keyName]);
      if (aType == null || bType == null) { return 0;} 
      else if ((aType === 'string' && bType === 'string') || 
        (aType === 'number' && bType === 'number') || (aType === 'boolean' && bType === 'boolean')
        ) {
          if (a[keyName] < b[keyName]) {return params.startsWith('-') ? 1 : -1} 
          if (a[keyName] > b[keyName]) {return params.startsWith('-') ? -1 : 1} 
          return 0;
        } else if (a[keyName] instanceof Date && b[keyName] instanceof Date) {
          if (a[keyName].getTime() < b[keyName].getTime()) {return params.startsWith('-') ? 1 : -1} 
          if (a[keyName].getTime() > b[keyName].getTime()) {return params.startsWith('-') ? -1 : 1} 
          return 0;
        }
        return 0;
    })
  }
  transform  (value: any, params: string | string[]): any {
    console.log('value', value);
    if (!Array.isArray(value)) {
      return [];
    }
    if (typeof(params) === 'string') {
      return this.sortArray(value, params);
    } else if (Array.isArray(params)) {
      let result = value;
      params.forEach((item: any) => {
        result = this.sortArray(result, item);
      });
      return result;
    }
  }

}
