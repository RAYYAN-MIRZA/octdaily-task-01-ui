import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ScheduleDemoInterface } from './interface/schedule-demo-interface';
import { ScheduleDemoService } from './service/schedule-demo.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-schedule-demo',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './schedule-demo.component.html',
  styleUrl: './schedule-demo.component.scss',
})
export class ScheduleDemoComponent {
  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);  
  businessName = new FormControl('', Validators.required);
  errorMessage: string = '';
  scheduleDate = new FormControl(new Date(), Validators.required);
  phoneNo = new FormControl('', [Validators.required]);
  formData!: ScheduleDemoInterface;

  constructor(private service: ScheduleDemoService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onSubmit(): void {
    // checking if some input field is empty
    if (this.email.valid === false || this.email.value === '') return;    
    if (this.name.value === '') return;
    if (this.businessName.value === '') return;
    if (this.phoneNo.value === '') return;
    if (this.scheduleDate.valid === false) return;

    const inpDate: Date = new Date(this.scheduleDate.value || ''); // converting type from string to Date

    // Date validation As it should be in the future

    // Declare a property to hold the current date
    const currentDate: Date = new Date();
    if (inpDate.getFullYear() < currentDate.getFullYear()) return;
    else if (inpDate.getFullYear() === currentDate.getFullYear()) {
      if (inpDate.getMonth() < currentDate.getMonth()) return;
      else if (inpDate.getMonth() === currentDate.getMonth()) {
        if (inpDate.getDate() < currentDate.getDate()) return; // sunday is zero        
      }
    }
    this.formData = {
      Name: this.name.value || '',
      Email: this.email.value || '',
      BusinessName: this.businessName.value || '',
      PhoneNo: this.phoneNo.value?.toString() || '', // converting to string because input type is number
      ScheduleDate: inpDate,
    };

    console.log(this.formData);

    this.service.postToBackend(this.formData).subscribe({
      next: (response) => {
        console.log('Response From BackEnd==>', response);
      },
      error: (error) => {
        console.error('Error from backend:', error);
        alert(error);
      },
    });
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (this.email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.errorMessage = '';
    }
  }
}
  