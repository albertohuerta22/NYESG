import { Component, OnInit, Input } from '@angular/core';
import { CalculationService } from '../../services/calculation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CalculatorComponent implements OnInit {
  @Input() usageType: string = 'electricity'; // Default usage type
  @Input() showElectricity: boolean = true; // Control visibility of electricity fields
  @Input() showWater: boolean = false; // Control visibility of water fields
  @Input() showWaste: boolean = false; // Control visibility of waste fields

  public electricityUsage: number = 0;
  public gasUsage: number = 0;
  public waterUsage: number = 0;
  public wasteDisposal: number = 0;
  public calculatedCO2: number | null = null;

  public label1: string = '';
  public label2: string = '';

  constructor(private calculationService: CalculationService) {}

  ngOnInit(): void {
    this.setLabels();
  }

  setLabels(): void {
    if (this.usageType === 'electricity') {
      this.label1 = 'Electricity Usage (kWh)';
      this.label2 = 'Gas Usage (cubic meters)';
    } else if (this.usageType === 'water') {
      this.label1 = 'Water Usage (gallons)';
      this.label2 = ''; // No second input needed for water usage
    } else if (this.usageType === 'waste') {
      this.label1 = 'Waste Disposal (tons)';
      this.label2 = ''; // No second input needed for waste disposal
    }
  }

  calculateCO2(): void {
    let electricityCO2 = 0;
    let waterCO2 = 0;
    let wasteCO2 = 0;

    if (this.usageType === 'electricity' && this.showElectricity) {
      electricityCO2 = this.calculationService.calculateCO2FromEnergy(
        this.electricityUsage,
        this.gasUsage
      );
    }

    if (this.usageType === 'water' && this.showWater) {
      waterCO2 = this.calculationService.calculateCO2FromWater(this.waterUsage);
    }

    if (this.usageType === 'waste' && this.showWaste) {
      wasteCO2 = this.calculationService.calculateCO2FromWaste(
        this.wasteDisposal
      );
    }

    this.calculatedCO2 = electricityCO2 + waterCO2 + wasteCO2;
  }
}
