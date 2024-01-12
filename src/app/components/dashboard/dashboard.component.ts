import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'position', 'department', 'actions'];
  dataSource: any[] = [];
  isLoading = true;
  currentPage = 1;
  perPage = 10;
  totalItems = 0;
  totalPages = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.isLoading = true;
  
    this.employeeService.getEmployees(this.currentPage, this.perPage).subscribe(
      (data) => {
        console.log(data);
        this.dataSource = data.items;
        this.totalItems = data.total_count || 0;
        this.totalPages = this.totalItems > 0 ? Math.ceil(this.totalItems / this.perPage) : 0;  // Updated line
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching employee data:', error);
        this.isLoading = false;
      }
    );
  }
  
  
  // onPageChange(newPage: number): void {
  //   console.log(newPage);
  //   this.currentPage = newPage;
  //   this.loadEmployeeData();
  // }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEmployeeData();
    }
  }

  onPageChange(newPage: number, pageSize: number): void {
    if (this.currentPage !== newPage || this.perPage !== pageSize) {
      this.currentPage = newPage;
      this.perPage = pageSize;
      this.loadEmployeeData();
    }
  }
 

  onNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log('Next Page Clicked');
      this.loadEmployeeData();
    }
  }
}
