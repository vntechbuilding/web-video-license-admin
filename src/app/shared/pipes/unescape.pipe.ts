import { Pipe, PipeTransform } from '@angular/core';
import { unescape } from 'lodash';

@Pipe({
  name: 'unescape',
  standalone: true,
})
export class UnescapePipe implements PipeTransform {
  transform(value: string): string {
    return unescape(value);
  }
}
