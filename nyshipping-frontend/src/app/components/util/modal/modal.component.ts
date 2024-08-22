import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ModalComponent {
  public includeEnergy: boolean = true;
  public includeWater: boolean = true;
  public includeWaste: boolean = true;

  @Output() generateReport = new EventEmitter<{
    energy: boolean;
    water: boolean;
    waste: boolean;
  }>();

  @Output() closeModalEvent = new EventEmitter<void>();

  onGenerate() {
    this.generateReport.emit({
      energy: this.includeEnergy,
      water: this.includeWater,
      waste: this.includeWaste,
    });
  }

  closeModal() {
    console.log('Close modal button clicked');
    this.closeModalEvent.emit();
  }
}
