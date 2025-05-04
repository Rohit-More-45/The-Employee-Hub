import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { employeeFormGuard } from './employee-form.guard';

describe('employeeFormGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeFormGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
