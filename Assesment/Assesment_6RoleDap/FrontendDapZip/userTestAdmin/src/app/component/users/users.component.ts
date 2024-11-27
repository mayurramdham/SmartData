import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../utility/navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiIntergrateServiceService } from '../../servies/api-intergrate-service.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../servies/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  searchTerm: string = '';
  filteredUsers: any[] = [];
  private searchSubject = new Subject<string>();
  private apiService = inject(ApiIntergrateServiceService);
  private authService = inject(AuthServiceService);
  private toastr = inject(ToastrService);

  data: any[] = [];
  user: any = {};
  isEditMode = false;
  userForm: FormGroup;
  pageSize: number = 4;
  pageNumber: number = 1;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      userEmail: [''],
      roles: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.getUsers();

    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.filterUsers(searchTerm);
      });
  }

  onSearchChange(searchTerm: string): void {
    console.log('search term', searchTerm);
    this.searchSubject.next(searchTerm);
  }

  filterUsers(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsers = this.data;
    } else {
      this.filteredUsers = this.data.filter(
        (user) =>
          user.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.LastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  getUsers() {
    console.log('GetUsers Called');
    this.apiService.getAllUser(this.pageSize, this.pageNumber).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.data = res.data;
          this.filteredUsers = this.data;
          console.log('data', this.filteredUsers);
        } else {
          console.error('Error occurred');
        }
      },
      (error) => {
        console.log('Error occurred while fetching users');
      }
    );
  }

  updateUserToastr() {
    this.toastr.warning('User updated successfully', '', { closeButton: true });
  }

  DeleteUserToastr() {
    this.toastr.error('User deleted successfully', '', { closeButton: true });
  }

  openEditModal(user: any): void {
    this.isEditMode = true;
    this.userForm.patchValue({
      firstName: user.FirstName,
      lastName: user.LastName,
      userEmail: user.UserEmail,
      roles: user.Roles,
      address: user.Address,
    });
    this.user = user;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = {
        ...this.user,
        ...this.userForm.value,
      };

      this.apiService.updateUser(updatedUser).subscribe(
        (response) => {
          alert('User updated successfully');
          this.isEditMode = false;
          this.updateUserToastr();
          this.getUsers();
        },
        (error) => {
          console.error(error);
          alert('Error updating user');
        }
      );
    } else {
      alert('Please fill in all required fields');
    }
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(userId).subscribe(
        (response) => {
          this.DeleteUserToastr();
          alert(response.message);
          this.getUsers();
        },
        (error) => {
          console.error(error);
          alert('Error deleting user');
        }
      );
    }
  }
}
