import { Injectable } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { EmployeeFormComponent } from '../modules/employee-form/employee-form.component';

@Injectable({ providedIn: 'root' })
export class EmployeeFormGuard {
  // Method to check if form is dirty
  confirmExit(): boolean {
    return window.confirm('You have unsaved changes. Are you sure you want to leave?');
  }
}

// Export as a function for standalone API support
export const canDeactivateEmployeeForm: CanDeactivateFn<EmployeeFormComponent> = (component) => {
  if (component.employeeForm.dirty) {
    return true;
  }
  return true;
};