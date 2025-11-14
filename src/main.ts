import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { MessageModalComponent } from './message-modal/message-modal.component';

@Component({
  selector: 'app-root',
  imports: [MessageModalComponent],
  template: `
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Message Modal Demo</h1>

      <div class="space-y-4">
        <button
          (click)="showSuccessModal()"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Show Success Modal
        </button>

        <button
          (click)="showErrorModal()"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Show Error Modal
        </button>

        <button
          (click)="showAutoCloseModal()"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Show Auto-Close Modal
        </button>
      </div>
    </div>

    <app-message-modal
      [isOpen]="modalConfig.isOpen"
      [type]="modalConfig.type"
      [title]="modalConfig.title"
      [message]="modalConfig.message"
      [autoClose]="modalConfig.autoClose"
      [autoCloseDelay]="modalConfig.autoCloseDelay"
      (close)="closeModal()"
    />
  `,
})
export class App {
  modalConfig = {
    isOpen: false,
    type: 'success' as 'success' | 'error',
    title: '',
    message: '',
    autoClose: false,
    autoCloseDelay: 3000
  };

  showSuccessModal() {
    this.modalConfig = {
      isOpen: true,
      type: 'success',
      title: 'Operação Concluída!',
      message: 'Sua ação foi realizada com sucesso.',
      autoClose: false,
      autoCloseDelay: 3000
    };
  }

  showErrorModal() {
    this.modalConfig = {
      isOpen: true,
      type: 'error',
      title: 'Algo deu errado',
      message: 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
      autoClose: false,
      autoCloseDelay: 3000
    };
  }

  showAutoCloseModal() {
    this.modalConfig = {
      isOpen: true,
      type: 'success',
      title: 'Salvo Automaticamente',
      message: 'Este modal fechará automaticamente em 3 segundos.',
      autoClose: true,
      autoCloseDelay: 3000
    };
  }

  closeModal() {
    this.modalConfig = { ...this.modalConfig, isOpen: false };
  }
}

bootstrapApplication(App);
