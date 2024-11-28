import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { customValidator } from "../services/validator";

@Component({
  selector: "app-form-array",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./form-array.component.html",
  styleUrl: "./form-array.component.scss",
})
export class FormArrayComponent {
  form: FormGroup;
  // formConfig = {
  //   name: { value: '', validators: [Validators.required] },
  //   phoneNumbers: [
  //     { phone: { value: '1234567890', validators: [Validators.required, Validators.pattern(/^\d{10}$/)] } },
  //     { phone: { value: '9876543210', validators: [Validators.required, Validators.pattern(/^\d{10}$/)] } }
  //   ]
  // };
  constructor(private fb: FormBuilder) {
    // this.form = this.createFormFromJSON(this.formConfig);
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required, customValidator]),
      phoneNumbers: new FormArray([this.createPhoneNumber()]),
    });
  }
  createPhoneNumber(): FormGroup {
    return new FormGroup({
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
    });
  }
  addPhoneNumber() {
    (this.form.get("phoneNumbers") as FormArray).push(this.createPhoneNumber());
  }
  removePhoneNumber(index: number) {
    (this.form.get("phoneNumbers") as FormArray).removeAt(index);
  }
  onSubmit() {
    console.log(this.form.value);
  }
  get phoneNumbers(): FormArray {
    return this.form.get("phoneNumbers") as FormArray;
  }

  show() {
    console.log(this.form.value);
    console.log(this.form);
    console.log(this.form.invalid);
  }
  phoneData: any = ["1234567890", "0987654321", "1122334455"];

  setPhoneNumbers(phoneNumbers: string[]) {
    const phoneNumbersArray = this.form.get("phoneNumbers") as FormArray;

    phoneNumbersArray.clear();

    phoneNumbers.forEach((phone) => {
      phoneNumbersArray.push(
        new FormGroup({
          phone: new FormControl(phone, [
            Validators.required,
            Validators.pattern(/^\d{10}$/),
          ]),
        })
      );
    });
  }

  // createFormFromJSON(config: any): FormGroup {
  //   const formGroup = this.fb.group({});

  //   Object.keys(config).forEach(key => {
  //     if (Array.isArray(config[key])) {
  //       // Handle FormArray
  //       const formArray = this.fb.array(
  //         config[key].map((item: any) =>
  //           this.fb.group(
  //             Object.keys(item).reduce((acc, subKey) => {
  //               acc[subKey] = new FormControl(item[subKey].value, item[subKey].validators || []);
  //               return acc;
  //             }, {})
  //           )
  //         )
  //       );
  //       formGroup.addControl(key, formArray);
  //     } else {
  //       // Handle FormControl
  //       formGroup.addControl(
  //         key,
  //         new FormControl(config[key].value, config[key].validators || [])
  //       );
  //     }
  //   });

  //   return formGroup;
  // }
}
