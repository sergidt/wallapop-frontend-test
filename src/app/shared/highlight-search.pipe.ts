import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightSearchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, '<span class="highlighted-text">' + match[0] + '</span>');
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue);
  }
}
