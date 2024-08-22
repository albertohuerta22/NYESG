import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/util/modal/modal.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import jsPDF from 'jspdf';
import { EnergyUsageChartComponent } from './components/energy-usage-chart/energy-usage-chart.component';
import { WaterUsageComponent } from './components/water-usage-chart-component/water-usage.component';
import { WasteDisposalComponent } from './components/waste-disposal-chart-component/waste-disposal.component';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar (showModal)="showReportModal()"></app-navbar>
    <div class="main-content">
      <router-outlet></router-outlet>
      <app-modal
        *ngIf="isReportModalVisible"
        (generateReport)="onGenerate($event)"
        (closeModalEvent)="closeReportModal()"
      ></app-modal>
      <div *ngIf="renderingForPdf">
        <div *ngIf="renderEnergy" class="energy-chart">
          <app-energy-usage-chart></app-energy-usage-chart>
        </div>
        <div *ngIf="renderWater" class="water-chart">
          <app-water-usage-chart></app-water-usage-chart>
        </div>
        <div *ngIf="renderWaste" class="waste-chart">
          <app-waste-disposal-chart></app-waste-disposal-chart>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    ModalComponent,
    CommonModule,
    // Ensure these are the correct paths and names for your components
    EnergyUsageChartComponent,
    WaterUsageComponent,
    WasteDisposalComponent,
  ],
})
export class AppComponent {
  title = 'nyshipping-frontend';
  isReportModalVisible = false;

  renderingForPdf = false;
  renderEnergy = false;
  renderWater = false;
  renderWaste = false;

  constructor(private cdr: ChangeDetectorRef) {}

  showReportModal() {
    this.isReportModalVisible = true;
    console.log('Modal is now visible');
  }

  closeReportModal() {
    console.log('Modal is closing');
    this.isReportModalVisible = false;
    this.cdr.detectChanges();
  }

  onGenerate(options: { energy: boolean; water: boolean; waste: boolean }) {
    console.log('Generating report with options:', options);
    this.renderEnergy = options.energy;
    this.renderWater = options.water;
    this.renderWaste = options.waste;

    this.renderingForPdf = true;

    // Delay to allow Angular to render the charts before generating the PDF
    setTimeout(() => {
      this.generatePdfReport();
      this.renderingForPdf = false;
      this.closeReportModal();
    }, 1000);
  }

  generatePdfReport() {
    const doc = new jsPDF();

    if (this.renderEnergy) {
      const energyCanvas = document.querySelector(
        '.energy-chart canvas'
      ) as HTMLCanvasElement;
      if (energyCanvas) {
        const energyImgData = energyCanvas.toDataURL('image/png');
        doc.text('Energy Usage Chart', 10, 10);
        doc.addImage(energyImgData, 'PNG', 10, 20, 190, 90);
        doc.addPage();
      }
    }

    if (this.renderWater) {
      const waterCanvas = document.querySelector(
        '.water-chart canvas'
      ) as HTMLCanvasElement;
      if (waterCanvas) {
        const waterImgData = waterCanvas.toDataURL('image/png');
        doc.text('Water Usage Chart', 10, 10);
        doc.addImage(waterImgData, 'PNG', 10, 20, 190, 90);
        doc.addPage();
      }
    }

    if (this.renderWaste) {
      const wasteCanvas = document.querySelector(
        '.waste-chart canvas'
      ) as HTMLCanvasElement;
      if (wasteCanvas) {
        const wasteImgData = wasteCanvas.toDataURL('image/png');
        doc.text('Waste Disposal Chart', 10, 10);
        doc.addImage(wasteImgData, 'PNG', 10, 20, 190, 90);
      }
    }

    doc.save('report.pdf');
  }
}
