import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',
  standalone: true
})
export class CustomPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    if (typeof value !== 'string') {

      return value;

    }

    return value.charAt(0).toUpperCase() + value.slice(1);

  }
}

