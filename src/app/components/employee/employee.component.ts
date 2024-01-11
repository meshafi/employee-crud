import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: Employee | undefined;
  originalEmployee: Employee | undefined;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.employeeService.getEmployeeById(id).subscribe(
        (data) => {
          this.employee = data;
          this.originalEmployee = { ...data }; 
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
            console.log('Employee updated successfully.');
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
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      console.error('Employee is undefined.');
    }
  }
}
