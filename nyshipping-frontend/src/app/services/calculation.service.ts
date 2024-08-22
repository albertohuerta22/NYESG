import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  // Example calculation for CO2 emissions from energy usage
  calculateCO2FromEnergy(electricityUsage: number, gasUsage: number): number {
    const electricityEmissionFactor = 0.92; // kg CO2 per kWh (example factor)
    const gasEmissionFactor = 2.75; // kg CO2 per cubic meter (example factor)

    const electricityCO2 = electricityUsage * electricityEmissionFactor;
    const gasCO2 = gasUsage * gasEmissionFactor;

    return electricityCO2 + gasCO2;
  }

  // Similar methods for water and waste can be added here
  calculateCO2FromWater(waterUsage: number): number {
    const waterEmissionFactor = 0.3; // Example factor
    return waterUsage * waterEmissionFactor;
  }

  calculateCO2FromWaste(wasteAmount: number): number {
    const wasteEmissionFactor = 1.5; // Example factor
    return wasteAmount * wasteEmissionFactor;
  }

  // Additional utility methods for stretch goals can also be added here
}
