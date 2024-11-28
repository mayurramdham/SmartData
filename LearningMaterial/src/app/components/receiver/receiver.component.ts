import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CustomPipePipe } from '../../custom-pipe.pipe';

@Component({
  selector: 'app-receiver',
  standalone: true,
  imports: [CustomPipePipe],
  templateUrl: './receiver.component.html',
  styleUrl: './receiver.component.scss'
})
export class ReceiverComponent {
message: string;
behaviourSubjectdataMessage: any;
Value:any="hello"


constructor(private dataService:DataService){
  this.message="Initial Value"
}

ngOnInit() {
  this.dataService.data$.subscribe((data) => {
    this.message = data;
    console.log(this.message,"subject");
    
  });
  this.dataService.behaviourSubjectdata$.subscribe((data) => {
    this.behaviourSubjectdataMessage = data;
    console.log(this.behaviourSubjectdataMessage,"behaviourSubjectdata");
    
  });
  this.dataService.data$.subscribe((data:any)=>{


    console.log(data,"main data")
  })
}

subscribe(){
  this.dataService.data$.subscribe((data:any)=>{


    console.log(data,"main data")
  })
}





}
