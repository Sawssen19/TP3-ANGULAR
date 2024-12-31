import { Component } from '@angular/core';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SignupFormComponent, ModalComponent, CommonModule],
  template: `
    <div class="container">
      <button (click)="openModal()" class="open-modal-btn">
        S'inscrire
      </button>

      <app-modal [isOpen]="isModalOpen" (close)="closeModal()">
        <app-signup-form></app-signup-form>
      </app-modal>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    }

    .open-modal-btn {
      padding: 0.75rem 1.5rem;
      background: white;
      border: none;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
      color: #6366f1;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .open-modal-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 12px -1px rgba(0, 0, 0, 0.2);
    }
  `]
})
export class AppComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}