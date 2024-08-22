import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {
  @Output() showModal = new EventEmitter<void>();

  openReportModal(event: Event): void {
    event.preventDefault(); // Prevent the default action of the link
    this.showModal.emit();
  }
}
