import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      address: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: ['', [Validators.required,Validators.pattern(/^[0-9]+$/)]],
    });
  }

  addEmployee(): void {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        (response) => {
          console.log('Employee added successfully:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    } else {
      console.error('Errord Addming employee:');
    }
  }
}
