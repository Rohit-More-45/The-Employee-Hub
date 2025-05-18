import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeFormGuard } from '../../guards/employee-form.guard';


@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule, CommonModule],
  providers : [EmployeeFormGuard],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route : ActivatedRoute,
    private router : Router,
    public gaurd : EmployeeFormGuard
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.params.subscribe(params=>{
      const id = params['id'];

      if(id){
        this.isEditMode = true;
        this.employeeId = id;
        // Fetch employee and patch form
        this.employeeService.getEmployee(id).subscribe(employee => {
          this.employeeForm.patchValue(employee);
        });
      }
    })
  }

  onSubmit(){
    if(this.employeeForm.valid){
      const employee = this.employeeForm.value;
      if(this.isEditMode){
        this.employeeService.updateEmployee({...employee ,id:this.employeeId}).subscribe(()=>
          {
                this.router.navigate(['/employees']);
          })
      }else{
        this.employeeService.addEmployee(employee).subscribe(()=>{
        this.employeeForm.reset();
        this.router.navigate(['/employees']);
        })
      }
      
    }
  }
}
