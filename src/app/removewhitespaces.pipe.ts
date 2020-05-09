import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removewhitespaces'
})
export class RemovewhitespacesPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toLowerCase().replace(/\s/g, '');
  }

}
