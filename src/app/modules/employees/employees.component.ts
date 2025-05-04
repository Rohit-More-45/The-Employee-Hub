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

  private employeeService = inject(EmployeeService);

  employees = signal<Employee[]>([]);

  constructor(){};

  ngOnInit(){
    this.employeeService.getEmployees().subscribe(data=>{
      this.employees.set(data);
    })
  }


}
