import { Component, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from "./components/container/container.component";
import { SenderComponent } from "./components/sender/sender.component";
import { ReceiverComponent } from './components/receiver/receiver.component';
import { DataService } from './services/data.service';
import { FormArrayComponent } from "./form-array/form-array.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContainerComponent, SenderComponent, ReceiverComponent, FormArrayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'POCs';

  constructor(private dataService:DataService) {
    afterNextRender({
      read: (didWrite) => {
        console.log("read called");
      },
      // Use the `Write` phase to write to a geometric property.
      write: () => {
        console.log("write called");

      }
      // Use the `Read` phase to read geometric properties after all writes have occurred.
    
    });

    this.dataService.data$.subscribe((data:any)=>{


      console.log(data,"main data")
    })
  }



}
