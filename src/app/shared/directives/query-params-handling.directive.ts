import { Directive } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Directive({
  selector: '[appQueryParamsHandling]',
})
export class QueryParamsHandlingDirective {
  constructor(routerLink: RouterLinkWithHref) {
    routerLink.queryParamsHandling = 'merge';
  }
}
