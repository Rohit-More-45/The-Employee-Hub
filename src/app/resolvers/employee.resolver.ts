import { ResolveFn } from '@angular/router';
import { Employee } from '../models/employee.model';
import { inject } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { catchError, map } from 'rxjs';

export const employeeResolver: ResolveFn<Employee> = (route, state) => {
  const id = route.paramMap.get('id');

  if(!id){
    return null as any ;
  }

  const employeeService = inject(EmployeeService);
  return employeeService.getEmployee(+id).pipe(
    map((employee: any) => employee),
    catchError(()=> null as any)
  )
};
