import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employee | undefined;
  originalEmployee: Employee | undefined;
  editMode = false;
  employeeForm: FormGroup;
  successMessage: string | null = null;
  deleteSuccessMessage: string | null = null;
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      address: ['', Validators.required],
      hireDate: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.employeeService.getEmployeeById(id).subscribe(
        (data) => {
          this.employee = data;
          this.employee.hireDate=this.employee.hireDate.substring(0,10);
          console.log(this.employee);
          this.originalEmployee = { ...data }; 
          this.originalEmployee.hireDate=this.originalEmployee.hireDate.substring(0,10);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    } else {
      console.error('Employee id is null.');
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  updateEmployee(): void {
    if (this.employee && this.originalEmployee) {
      if (JSON.stringify(this.employee) !== JSON.stringify(this.originalEmployee)) {
        console.log(this.employee._id);
        console.log(this.employee);
        console.log(this.originalEmployee);
        this.employeeService.updateEmployee(this.employee._id, this.employee).subscribe(
          () => {
            this.successMessage = 'Employee details updated successfully.';
            setTimeout(() => {
              this.successMessage = null;
            }, 2000);
          },
          (error) => {
            console.error('Error updating employee:', error);
          }
        );
      }
    }
    this.editMode = !this.editMode;
  }

  deleteAndRedirect(): void {
    if (this.employee) {
      this.employeeService.deleteEmployee(this.employee._id).subscribe(
        () => {
          console.log('Employee deleted successfully.');
          this.deleteSuccessMessage = 'Employee details deleted successfully.';
          setTimeout(() => {
            this.deleteSuccessMessage = null;
            this.router.navigate(['/dashboard']);
          }, 2000);
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      console.error('Employee is undefined.');
    }
  }
  anyFieldEmpty(): boolean {
    this.employeeForm.updateValueAndValidity();
  
    for (const controlName in this.employeeForm.controls) {
      const control = this.employeeForm.get(controlName);
  
      if (!control?.dirty) {
        continue;
      }
      
      if (control?.invalid || (control?.value === null || control?.value.trim() === '')) {
        return true;
      }
    }
  
    return false;
  }

  
}
