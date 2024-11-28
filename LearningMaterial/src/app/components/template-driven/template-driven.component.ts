import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from 'express';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-template-driven',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './template-driven.component.html',
  styleUrl: './template-driven.component.scss'
})
export class TemplateDrivenComponent {
  apiService:any
  constructor() {this.getObservable()
    this.callobserver()
     this.apiService = inject(ApiServiceService) ;
   }
  userData = {
    name: '',
    email: '',
    age: null
  };

  submitted: boolean = false;

  // getData() {
  //   this.apiService.getData().subscribe(
  //     (response:any) => {
  //       this.userData = response;
  //       console.log('Data fetched:', this.userData);
  //     },
  //     (error:any) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

  // get():Promise<any>{
  //   return  new Promise((resolve, reject) => {
  //     console.log("promise called")
  //     const data = null
  //     if (data != null) {
  
  //       resolve("resolved")
  //     }
  //     else {
  //       console.log("promise rejected")
  //       reject("rejected")
  //     }
  //   })
  // }

  // promis = new Promise((resolve, reject) => {
  //   console.log("promise called")
  //   const data = "data"
  //   if (data != null) {

  //     resolve("resolved")
  //   }
  //   else {
  //     console.log("promise rejected")
  //     reject("rejected")
  //   }
  // })
  onSubmit(form: any) {
    this.submitted = true;
    console.log('Form Submitted!', this.userData);

    // this.get().then((data)=>{ console.log("data res",data)

    // }
     
    // ).catch((reject)=>{ console.log("data not found",reject)

    // })
  }



  getObservable(): Observable<any> {
    return new Observable((observer) => {
      console.log("Observable called");
      const data = "null";
  
      if (data != null) {
        observer.error(data); // Emit value if data is not null
      } else {
        observer.next(data); // Emit null value if data is null
        observer.complete(); // Mark the observable as completed
      }
    });
  }

 callobserver(){this.getObservable().subscribe({
  next(position: any) {
    console.log('Current Position: ', position);
  },
  error(msg: any) {
    console.log('Error Getting Location: ', msg);
  },
  complete() {
    console.log('Observable completed.');
  }
});
 
}
hasUnsavedChanges: boolean = true;
canDeactivate(): boolean {
  return this.hasUnsavedChanges ? confirm("You have unsaved changes. Do you really want to leave?") : true;
}
}
