import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../core/utility/common.service';
import { AppointmentService } from '../../../core/auth/appointment.service';
import { ToasterService } from '../../../core/utility/toaster.service';
import { JwtService } from '../../../core/utility/jwt.service';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export class AppointmentComponent {
  appointmentForm!: FormGroup;
  specialities: any[] = [];
  providers: any[] = [];
  userTypeData: any[] = [];
  appointmentFormValue = {};
  currentUserType: number = 2;
  minTime: string = '00:00';
  today = new Date().toISOString().split('T')[0];
  private commonService = inject(CommonService);
  private appointmentService = inject(AppointmentService);
  private toasterService = inject(ToasterService);
  private jwtService = inject(JwtService);

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    const currentDate = new Date();
    this.today = currentDate.toISOString().slice(0, 10);

    this.appointmentForm = this.fb.group({
      patientId: this.jwtService.getUserId(),
      specialisationId: [],
      providerId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      chiefComplaint: ['', Validators.required],
      fees: ['', Validators.required],
    });

    this.getSpecialities();
    this.getAllProvider(this.currentUserType);
    this.appointmentForm
      .get('appointmentDate')
      ?.valueChanges.subscribe((selectedDate) => {
        this.updateMinTime(selectedDate);
      });

    const initialDate =
      this.appointmentForm.get('appointmentDate')?.value || this.today;
    this.updateMinTime(initialDate);
  }

  getAllProvider(currentUserType: any) {
    console.log('usertype is', currentUserType);

    this.appointmentService.getProviderList(currentUserType).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.providers = response.data;
          console.log('userTyepData', this.providers);
        }
      },
    });
  }

  getSpecialities() {
    this.commonService.getAllSpecialisation().subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.specialities = response.data;
          console.log('specility', this.specialities);
        } else {
          alert('response not handler properly');
        }
      },
    });
  }

  getProviders(event: any) {
    const selectedProviderId = +event.target.value;
    this.providers = [];
    console.log('selectedproviderId', selectedProviderId);
    this.commonService
      .getProviderBySpecialisation(selectedProviderId)
      .subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.providers = response.providers;
            console.log('providers data', this.providers);
          }
        },
        error: (response) => {
          console.log('unable to get response at specialisation', response);
        },
      });
  }

  onSubmit() {
    console.log('outside of the submit');
    if (this.appointmentForm.valid) {
      const payload = {
        patientId: this.jwtService.getUserId(),
        specialisationId: 1,
        providerId: this.appointmentForm.get('providerId')?.value,
        appointmentDate: this.appointmentForm.get('appointmentDate')?.value,
        appointmentTime: this.appointmentForm.get('appointmentTime')?.value,
        chiefComplaint: this.appointmentForm.get('chiefComplaint')?.value,
        fees: this.appointmentForm.get('fees')?.value,
      };

      console.log('inside of the submit', payload);
      this.appointmentService.addAppointment(payload).subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.toasterService.showSuccess('Appointment Booked Successfully');
            this.resetForm();
          } else {
            this.toasterService.showError('response not handled properly');
          }
        },
        error: (error) => {
          this.toasterService.showError('unable to get response');
          console.log(error);
        },
      });
    }
  }

  resetForm() {
    this.appointmentForm.reset();
  }

  //time code for particular data and time
  updateMinTime(selectedDate: string): void {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);

    if (
      selectedDateObj.getFullYear() === currentDate.getFullYear() &&
      selectedDateObj.getMonth() === currentDate.getMonth() &&
      selectedDateObj.getDate() === currentDate.getDate()
    ) {
      // If today is selected, calculate the minimum time as 1 hour from now
      const nextHour = new Date(currentDate.getTime() + 60 * 60 * 1000); // Add 1 hour
      this.minTime = nextHour.toISOString().slice(11, 16); // Format as "HH:MM"
    } else {
      // For future dates, no restrictions
      this.minTime = '00:00';
    }
  }
}
