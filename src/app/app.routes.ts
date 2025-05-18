import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EmployeesComponent } from './modules/employees/employees.component';
import { EmployeeFormComponent } from './modules/employee-form/employee-form.component';
import { canDeactivateEmployeeForm } from './guards/employee-form.guard';
import { employeeResolver } from './resolvers/employee.resolver';

export const routes: Routes = [
    {path:'', redirectTo: 'dashboard', pathMatch:'full'},
    {path: 'dashboard' , component:DashboardComponent},
    {path: 'employees', component:EmployeesComponent},
    {path: 'employee/new', component:EmployeeFormComponent, canDeactivate: [canDeactivateEmployeeForm]},
    {path: 'employees/edit/:id', component:EmployeeFormComponent, canDeactivate: [canDeactivateEmployeeForm], resolve : employeeResolver}
];
