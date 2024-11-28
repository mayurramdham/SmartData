import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { ParentComponent } from '../parent/parent.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [ChildComponent,ParentComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  // constructor(){
  //   this.get()
  // }
  myInputProperty:string=""
  parentdata: any;
  
get(event:any){

  this.parentdata = event
  this.myInputProperty = this.parentdata
}


}
