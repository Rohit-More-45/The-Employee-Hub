import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';
 

  constructor(private http: HttpClient) {}
  private employeesSignal = signal<Employee[]>([]);
   public employees = signal<Employee[]>([]);
  // Get all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Get single employee by ID
  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // Add new employee
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    const optimisticId = Date.now();
    const fakeEmployee = { ...employee, id: optimisticId };
  
    // ✅ Get current list as array
    const currentList = this.employeesSignal();
  
    // ✅ Update UI immediately
    this.employeesSignal.set([...currentList, fakeEmployee]);
  
 
    return new Observable((observer) => {
      this.http.post<Employee>(this.apiUrl, employee).subscribe({
        next: (realEmployee) => {
          const updatedList = this.employeesSignal().map(emp =>
            emp.id === optimisticId ? realEmployee : emp
          );
          this.employeesSignal.set(updatedList);
          observer.next(realEmployee);
          observer.complete();
        },
        error: (err) => {
          // ❌ Rollback on failure
          this.employeesSignal.set(currentList);
          observer.error(err);
        }
      });
    });
  }

  // Update existing employee
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  // Delete employee
  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  loadEmployees() {
  this.getEmployees().subscribe(data => {
    // This updates internal state
    this.employees.set(data);
  });
}
}