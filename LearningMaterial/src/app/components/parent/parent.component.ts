import { Component, Output,EventEmitter } from '@angular/core';
import { ChildComponent } from "../child/child.component";
// import EventEmitter from 'events';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {

  @Output() Exert = new EventEmitter<string>();

  exertEvent(){
    this.Exert.emit("love from parents")
  }


}
