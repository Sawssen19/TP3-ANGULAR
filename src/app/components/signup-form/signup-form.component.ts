import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup-form.component.html',
  styleUrls: [
    './styles/layout.css',
    './styles/form-elements.css',
    './styles/typography.css',
    './styles/buttons.css',
    './styles/feedback.css'
  ]
})
export class SignupFormComponent {
  @Output() signupSuccess = new EventEmitter<void>();
  
  signupForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched || this.submitted)) : false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.valid) {
      console.log('Formulaire soumis:', this.signupForm.value);
      this.success = true;
      this.signupForm.reset();
      this.submitted = false;
      this.signupSuccess.emit();
    }
  }
}