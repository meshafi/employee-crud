
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'position','department','actions'];
  dataSource: any[] = [];
  isLoading = true;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }
}

