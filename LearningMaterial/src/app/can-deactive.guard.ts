import { CanDeactivateFn } from '@angular/router';
import { TemplateDrivenComponent } from './components/template-driven/template-driven.component';

export const canDeactiveGuard: CanDeactivateFn<TemplateDrivenComponent> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
 
};
