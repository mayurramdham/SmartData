import { Routes } from '@angular/router';
import { TemplateDrivenComponent } from './components/template-driven/template-driven.component';
import { ReactiveFromComponent } from './components/reactive-from/reactive-from.component';
import { ObservavalsPromisesComponent } from './components/observavals-promises/observavals-promises.component';
import { authGuard } from './auth.guard';
import { canDeactiveGuard } from './can-deactive.guard';
import { ChildComponent } from './child/child.component';
import { canActiveChildGuard } from './can-active-child.guard';
import { SenderComponent } from './components/sender/sender.component';
import { ReceiverComponent } from './components/receiver/receiver.component';

export const routes: Routes = [{ path: "", component: ObservavalsPromisesComponent }, { path: "template", component: TemplateDrivenComponent, canActivate: [authGuard], canDeactivate: [canDeactiveGuard] }, { path: "reactive", component: ReactiveFromComponent }, {
    path: 'parent',
    children: [
        {
            path: 'child',
            component: ChildComponent,
            canActivateChild: [canActiveChildGuard],
        },
    ],
},{ path: "sender", component: SenderComponent },{ path: "receiver", component: ReceiverComponent }];
