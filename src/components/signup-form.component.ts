import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="form-container">
      <div class="form-header">
        <h1>Inscription</h1>
        <p>Créez votre compte en quelques étapes</p>
      </div>
      
      <div *ngIf="submitted && success" class="success-message">
        <svg xmlns="http://www.w3.org/2000/svg" class="success-icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        Inscription réussie !
      </div>

      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label class="form-label">Nom complet</label>
          <div class="input-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <input 
              type="text" 
              class="form-control"
              formControlName="fullName"
              placeholder="John Doe"
              [class.error]="isFieldInvalid('fullName')"
            >
          </div>
          <div *ngIf="isFieldInvalid('fullName')" class="error-message">
            Le nom complet est requis
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <div class="input-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <input 
              type="email" 
              class="form-control"
              formControlName="email"
              placeholder="john@example.com"
              [class.error]="isFieldInvalid('email')"
            >
          </div>
          <div *ngIf="isFieldInvalid('email')" class="error-message">
            Email invalide
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Mot de passe</label>
          <div class="input-group">
            <svg xmlns="http://www.w3.org/2000/svg" class="input-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
            <input 
              type="password" 
              class="form-control"
              formControlName="password"
              placeholder="••••••••"
              [class.error]="isFieldInvalid('password')"
            >
          </div>
          <div *ngIf="isFieldInvalid('password')" class="error-message">
            Le mot de passe doit contenir au moins 8 caractères
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          S'inscrire
          <svg xmlns="http://www.w3.org/2000/svg" class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  `
})
export class SignupFormComponent {
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
    }
  }
}