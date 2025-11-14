import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ModalConfig {
  iconColor: string;
  bgGradient: string;
  borderColor: string;
  titleDefault: string;
  buttonBg: string;
  progressBg: string;
  particleColor1: string;
  particleColor2: string;
  particleColor3: string;
  blurColor: string;
}

@Component({
  selector: 'app-message-modal',
  imports: [CommonModule],
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss']
})
export class MessageModalComponent implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() type: 'success' | 'error' = 'success';
  @Input() title = '';
  @Input() message = '';
  @Input() autoClose = false;
  @Input() autoCloseDelay = 3000;

  @Output() close = new EventEmitter<void>();

  private autoCloseTimer?: number;
  showContent = false;

  get currentConfig(): ModalConfig {
    const configs: Record<'success' | 'error', ModalConfig> = {
      success: {
        iconColor: 'text-green-500',
        bgGradient: 'from-green-50 to-emerald-50',
        borderColor: 'border-green-200',
        titleDefault: 'Sucesso!',
        buttonBg: 'bg-green-600 hover:bg-green-700',
        progressBg: 'bg-green-500',
        particleColor1: 'bg-green-400',
        particleColor2: 'bg-emerald-400',
        particleColor3: 'bg-green-500',
        blurColor: 'bg-green-500'
      },
      error: {
        iconColor: 'text-red-500',
        bgGradient: 'from-red-50 to-rose-50',
        borderColor: 'border-red-200',
        titleDefault: 'Erro!',
        buttonBg: 'bg-red-600 hover:bg-red-700',
        progressBg: 'bg-red-500',
        particleColor1: 'bg-red-400',
        particleColor2: 'bg-rose-400',
        particleColor3: 'bg-red-500',
        blurColor: 'bg-red-500'
      }
    };
    return configs[this.type];
  }

  get displayTitle(): string {
    return this.title || this.currentConfig.titleDefault;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        setTimeout(() => this.showContent = true, 10);

        if (this.autoClose) {
          this.autoCloseTimer = window.setTimeout(() => {
            this.onClose();
          }, this.autoCloseDelay);
        }
      } else {
        this.showContent = false;
        this.clearAutoCloseTimer();
      }
    }
  }

  ngOnDestroy(): void {
    this.clearAutoCloseTimer();
  }

  onClose(): void {
    this.clearAutoCloseTimer();
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  private clearAutoCloseTimer(): void {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = undefined;
    }
  }
}
