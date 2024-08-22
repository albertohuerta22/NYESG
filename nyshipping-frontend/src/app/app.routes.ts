import { Routes } from '@angular/router';
import { EnergyUsageChartComponent } from './components/energy-usage-chart/energy-usage-chart.component';
import { WaterUsageComponent } from './components/water-usage-chart-component/water-usage.component';
import { WasteDisposalComponent } from './components/waste-disposal-chart-component/waste-disposal.component';

export const routes: Routes = [
  { path: '', redirectTo: '/energy', pathMatch: 'full' },
  { path: 'energy', component: EnergyUsageChartComponent },
  { path: 'water-usage', component: WaterUsageComponent },
  { path: 'waste-disposal', component: WasteDisposalComponent },
  // Add more routes as needede
];
