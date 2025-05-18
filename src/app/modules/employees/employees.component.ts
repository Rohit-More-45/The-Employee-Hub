import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employees',
  imports: [RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.loadEmployees();
  }

  deleteEmployee(employee : Employee){
    
  }

}
