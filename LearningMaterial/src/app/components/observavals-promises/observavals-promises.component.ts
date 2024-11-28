import { Component, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LifecycleHooksComponent } from "../lifecycle-hooks/lifecycle-hooks.component";
import { DirectiveDirective } from '../../directive.directive';


@Component({
  selector: 'app-observavals-promises',
  standalone: true,
  imports: [RouterLink, LifecycleHooksComponent,DirectiveDirective],
  templateUrl: './observavals-promises.component.html',
  styleUrl: './observavals-promises.component.scss'
})
export class ObservavalsPromisesComponent {
  parentValue: string = 'Initial Value';
  @Output() emitted = new EventEmitter<string>();
  data: string = "";
  changeValue() {
    this.parentValue = this.parentValue === 'Initial Value' ? 'Updated Value' : 'Initial Value';
    this.data = "any data"
    this.emitted.emit(this.data);
  }
  // ngOnInit(): void {

  //   // localStorage.removeItem("isLoggedIn")
  //   // localStorage.clear()
  // }
  constructor() {
    console.log("constructor called2")
  }

  get(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("promise called")
      const data = null
      if (data != null) {

        resolve("resolved")
      }
      else {
        console.log("promise rejected")
        reject("rejected")
      }
    })
  }

  getResponse() {
    this.get().then((data) => {
      console.log("data res", data)

    }

    ).catch((reject) => {
      console.log("data not found", reject)

    })
  }


  // ngOnChanges(changes: SimpleChanges) {
  //   console.log("ngOnChanges2");
  //    if (changes['myInputProperty']) {
  //      const currentValue = changes['myInputProperty'].currentValue;
  //      const previousValue = changes['myInputProperty'].previousValue;

  //      console.log('myInputProperty changed from', previousValue, 'to', currentValue);
  //    }
  //  }
  //  ngDoCheck(): void {
  //     console.log("ngDoCheck2");
  //  }
  //  ngAfterContentInit(): void {
  //     console.log("ngAfterContentInit2");
  //  }
  //  ngAfterContentChecked(): void {
  //     console.log("ngAfterContentChecked2");
  //  }
  //  ngAfterViewInit(): void {
  //     console.log("ngAfterViewInit2");
  //  }
  //  ngAfterViewChecked(): void {
  //     console.log("ngAfterViewChecked2");
  //  }
  //  ngOnDestroy(): void {
  //     console.log("ngOnDestroy2");
  //  }
  //  ngOnInit(): void {
  //     console.log("ngOnInit2");
  //  }
}
