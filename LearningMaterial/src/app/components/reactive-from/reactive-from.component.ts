import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Router, RouterLink } from '@angular/router';
import { LifecycleHooksComponent } from '../lifecycle-hooks/lifecycle-hooks.component';
import { ObservavalsPromisesComponent } from '../observavals-promises/observavals-promises.component';



@Component({
  selector: 'app-reactive-from',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LifecycleHooksComponent, ObservavalsPromisesComponent],
  templateUrl: './reactive-from.component.html',
  styleUrl: './reactive-from.component.scss'
})
export class ReactiveFromComponent {
  userForm: FormGroup;
  submitted: boolean = false;
  formData: any = {};
  parentValue: string = 'Initial Value';
  constructor(private fb: FormBuilder, private apiService: ApiServiceService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['']
    });
    // this.userForm.get("name")?.setValue("hello Ayyush")}}
  }
  received(event: string) {
    this.parentValue= "sent to life cycle "
    console.log(event, "This is from obs comp to life cycle");
  }
  ngOnInit(): void {

    localStorage.setItem("isLoggedIn", "true")
    sessionStorage.setItem("isLoggedIn", "true")
  }

  set() {
    this.userForm.get("name")?.setValue("set value Ayyush")
  }
  onSubmit() {
    this.submitted = true;
    this.formData = this.userForm.value;
    // this.apiService.postData(this.formData).subscribe(
    //   (response) => {
    //     console.log('Data submitted:', response);
    //   },
    //   (error) => {
    //     console.error('Error submitting data:', error);
    //   }
    // );

    this.apiService.postData(this.formData).subscribe((response: any) => {
      if (response.success === true && response.data.length > 0) {

      } else {

      }
    });
  }
}
