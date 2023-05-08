import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitIntoWords',
  standalone: true,
})
export class SplitIntoWordsPipe implements PipeTransform {
  transform(value: string): string[] {
    if (!value) {
      return [];
    }

    return value.split(' ');
  }
}
