import { Component, OnInit, Inject } from '@angular/core';
import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartType,
  ChartDataset,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WaterUsageService } from '../../services/water-usage.service';
import { CalculationService } from '../../services/calculation.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from '../calculator/calculator.component'; // Import CalculatorComponent

@Component({
  selector: 'app-water-usage-chart',
  templateUrl: './water-usage.component.html',
  styleUrls: ['./water-usage.component.scss'],
  standalone: true,
  imports: [
    BaseChartDirective,
    NgIf,
    NgFor,
    CommonModule,
    FormsModule,
    CalculatorComponent,
  ], // Add CalculatorComponent to imports
})
export class WaterUsageComponent implements OnInit {
  public chartTitle: string = 'NYShipping Water Usage Metrics 2023';
  public chartLabels: string[] = [];
  public mixedChartData: {
    labels: string[];
    datasets: ChartDataset<'bar' | 'line'>[];
  } = { labels: [], datasets: [] };
  public chartType: ChartType = 'bar';
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  public periods: string[] = ['Monthly', 'Quarterly', 'Yearly'];
  public selectedPeriod: string = 'Monthly';
  public co2Score: number | null = null;
  public showNationalAverage: boolean = true; // Toggle for National Average

  constructor(
    private waterUsageService: WaterUsageService,
    private calculationService: CalculationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  loadData(): void {
    this.waterUsageService.getWaterUsageData().subscribe(
      (data) => {
        let filteredData = this.filterDataByPeriod(data, this.selectedPeriod);
        this.chartLabels = filteredData.map((item) =>
          this.formatMonthYear(item.date)
        );

        const waterUsageData = filteredData.map((item) => item.gallonsUsed);

        const nationalAverageData: ChartDataset<'line'> = {
          data: this.getNationalAverageData(
            filteredData.length,
            this.selectedPeriod
          ),
          label: 'National Average',
          type: 'line',
          borderColor: 'red',
          backgroundColor: 'transparent',
          fill: false,
        };

        this.mixedChartData = {
          labels: this.chartLabels,
          datasets: [
            {
              data: waterUsageData,
              label: 'Gallons Used',
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              type: 'bar',
            },
            ...(this.showNationalAverage ? [nationalAverageData] : []), // Conditional inclusion of the national average
          ],
        };

        // Calculate CO2 Score
        this.co2Score = this.calculateCO2Score(waterUsageData);
      },
      (error) => {
        console.error('Failed to load data', error);
      }
    );
  }

  getNationalAverageData(length: number, period: string): number[] {
    const nationalAverageValue = 5000; // Example national average value for water usage

    if (period === 'Yearly') {
      return Array(length).fill(nationalAverageValue);
    }

    const nationalAverages = [
      4500, 4600, 4700, 4800, 4900, 5000, 5100, 5200, 5300, 5400, 5500, 5600,
    ];

    return nationalAverages.slice(0, length);
  }

  calculateCO2Score(waterUsageData: number[]): number {
    const totalUsage = waterUsageData.reduce((sum, value) => sum + value, 0);
    return this.calculationService.calculateCO2FromWater(totalUsage);
  }

  filterDataByPeriod(data: any[], period: string): any[] {
    const uniqueMonths = new Map();

    data.forEach((item) => {
      const monthYear = new Date(item.date).toISOString().slice(0, 7);
      if (!uniqueMonths.has(monthYear)) {
        uniqueMonths.set(monthYear, item);
      }
    });

    let filteredData = Array.from(uniqueMonths.values());

    filteredData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    switch (period) {
      case 'Monthly':
        return filteredData;
      case 'Quarterly':
        return filteredData.filter((item, index) => index % 3 === 0);
      case 'Yearly':
        return filteredData.filter((item, index) => index % 12 === 0);
      default:
        return filteredData;
    }
  }

  formatMonthYear(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions =
      this.selectedPeriod === 'Yearly'
        ? { year: 'numeric' }
        : { month: 'long' };

    return date.toLocaleDateString('en-US', options);
  }

  onPeriodChange(): void {
    this.loadData();
  }

  changeChartType(type: ChartType): void {
    this.chartType = type;
    this.loadData();
  }

  toggleNationalAverage(): void {
    this.showNationalAverage = !this.showNationalAverage;
    this.loadData(); // Reload data when the toggle changes
  }
}
