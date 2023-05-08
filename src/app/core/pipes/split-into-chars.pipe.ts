import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitIntoChars',
  standalone: true,
})
export class SplitIntoCharsPipe implements PipeTransform {
  transform(value: string): string[] {
    return value.split('').map((char) => (char === ' ' ? ' ' : char));
  }
}
