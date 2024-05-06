import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactUsInterface } from './interface/contact-us-interface';
import { ContactUsService } from './service/contact-us.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {
  name = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  zip = new FormControl('', [Validators.required]);
  businessName = new FormControl('', Validators.required);
  formData!: ContactUsInterface;
  errorMessage: string = '';

  constructor(private service: ContactUsService) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  onSubmit(): void {
    // checking if some input field is empty
    if (this.email.valid === false || this.email.value === '') return;
    if (this.zip.value === '') return;
    if (this.name.value === '') return;
    if (this.businessName.value === '') return;

    console.log(
      'name== ',
      this.name,
      ',',
      this.email,
      ',',
      this.businessName,
      ',',
      this.zip
    );
    this.formData = {
      name: this.name.value || '', //putting OR operator only because of typescript as formcontrol returns <stirng || null> while the interface only accepts strings
      email: this.email.value || '',
      zip: this.zip.value || '',
      businessName: this.businessName.value || '',
    };
    this.service.postToBackend(this.formData).subscribe({
      next: (response) => {
        console.log('Response From BackEnd==>', response);
      },
      error: (error) =>   {
        console.error('Error from backend:', error);
        alert(error);
      },
    });
    console.log(this.formData);
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
