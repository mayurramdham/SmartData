import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ObservavalsPromisesComponent } from '../observavals-promises/observavals-promises.component';

@Component({
   selector: 'app-lifecycle-hooks',
   standalone: true,
   imports: [CommonModule, ObservavalsPromisesComponent],
   templateUrl: './lifecycle-hooks.component.html',
   styleUrl: './lifecycle-hooks.component.scss'
})
export class LifecycleHooksComponent implements OnChanges {
   @Input() myInputProperty: string = '';

   variable: any = false;
   constructor() {
      console.log("constructor ");
   }




   ngOnChanges(changes: SimpleChanges) {
      console.log("ngOnChanges");
      if (changes['myInputProperty']) {
         let currentValue = changes['myInputProperty'].currentValue;
         let previousValue = changes['myInputProperty'].previousValue;
         if (this.myInputProperty != previousValue) {
            this.myInputProperty = currentValue
         } else{
            this.myInputProperty = previousValue
         }
            console.log('myInputProperty changed from', previousValue, 'to', currentValue);
      }
   }
   //   ngDoCheck(): void {
   //      console.log("ngDoCheck");
   //   }
   //   ngAfterContentInit(): void {
   //      console.log("ngAfterContentInit");
   //   }
   //   ngAfterContentChecked(): void {
   //      console.log("ngAfterContentChecked");
   //   }
   //   ngAfterViewInit(): void {
   //      console.log("ngAfterViewInit");
   //   }
   //   ngAfterViewChecked(): void {
   //      console.log("ngAfterViewChecked");
   //   }
   //   ngOnDestroy(): void {
   //      console.log("ngOnDestroy");
   //   }
   //   ngOnInit(): void {
   //      console.log("ngOnInit");
   //   }


}
