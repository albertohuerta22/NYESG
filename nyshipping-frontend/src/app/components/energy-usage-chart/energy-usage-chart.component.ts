import { Component, OnInit, Inject } from '@angular/core';
import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartType,
  ChartData,
  ChartDataset,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculationService } from '../../services/calculation.service';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-energy-usage-chart',
  templateUrl: './energy-usage-chart.component.html',
  styleUrls: ['./energy-usage-chart.component.scss'],
  standalone: true,
  imports: [
    BaseChartDirective,
    NgIf,
    NgFor,
    CommonModule,
    FormsModule,
    CalculatorComponent,
  ],
})
export class EnergyUsageChartComponent implements OnInit {
  public chartTitle: string = 'NYShipping Energy Usage Metrics 2023';
  public chartLabels: string[] = [];
  public mixedChartData: ChartData<'bar' | 'line'> = { datasets: [] };
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
  public showNationalAverage: boolean = true;

  public co2EmissionScore: number | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private calculationService: CalculationService
  ) {
    //need this for it to work
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadData();
    }
  }

  loadData(): void {
    this.http
      .get<any[]>('http://localhost:5020/api/energy')
      .subscribe((data) => {
        data.sort(
          (a, b) =>
            new Date(a.dateRecorded).getTime() -
            new Date(b.dateRecorded).getTime()
        );

        let filteredData = this.filterDataByPeriod(data, this.selectedPeriod);
        this.chartLabels = filteredData.map((item) =>
          this.formatMonthYear(item.dateRecorded)
        );

        const electricityUsageData = filteredData.map(
          (item) => item.electricityUsage
        );
        const gasUsageData = filteredData.map((item) => item.gasUsage);

        this.co2EmissionScore = this.calculateCO2Score(
          electricityUsageData,
          gasUsageData
        );

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

        if (this.chartType === 'bar') {
          this.mixedChartData = {
            labels: this.chartLabels,
            datasets: [
              {
                data: electricityUsageData,
                label: 'Electricity Usage',
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                type: 'bar',
              },
              {
                data: gasUsageData,
                label: 'Gas Usage',
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                type: 'bar',
              },
              ...(this.showNationalAverage ? [nationalAverageData] : []),
            ],
          };
        } else if (this.chartType === 'line') {
          this.mixedChartData = {
            labels: this.chartLabels,
            datasets: [
              {
                data: electricityUsageData,
                label: 'Electricity Usage',
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.1,
                type: 'line',
              },
              {
                data: gasUsageData,
                label: 'Gas Usage',
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.1,
                type: 'line',
              },
              ...(this.showNationalAverage ? [nationalAverageData] : []), // Conditional inclusion of the national average
            ],
          };
        }
      });
  }

  filterDataByPeriod(data: any[], period: string): any[] {
    const uniqueMonths = new Map();

    data.forEach((item) => {
      const monthYear = new Date(item.dateRecorded).toISOString().slice(0, 7); // "YYYY-MM" format
      if (!uniqueMonths.has(monthYear)) {
        uniqueMonths.set(monthYear, item);
      }
    });

    let filteredData = Array.from(uniqueMonths.values());

    // Sort data by date to ensure the correct order
    filteredData.sort(
      (a, b) =>
        new Date(a.dateRecorded).getTime() - new Date(b.dateRecorded).getTime()
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

  getNationalAverageData(length: number, period: string): number[] {
    const nationalAverageValue = 1150;

    if (period === 'Yearly') {
      return Array(length).fill(nationalAverageValue);
    }

    const nationalAverages = [
      1200, 1150, 1180, 1170, 1190, 1210, 1220, 1160, 1140, 1130, 1150, 1100,
    ];

    return nationalAverages.slice(0, length);
  }

  changeChartType(type: ChartType): void {
    this.chartType = type;
    this.loadData();
  }

  onPeriodChange(): void {
    this.loadData();
  }

  toggleNationalAverage(value: boolean): void {
    this.showNationalAverage = value;
    this.loadData();
  }

  calculateCO2Score(
    electricityUsageData: number[],
    gasUsageData: number[]
  ): number {
    const totalElectricityUsage = electricityUsageData.reduce(
      (sum, value) => sum + value,
      0
    );
    const totalGasUsage = gasUsageData.reduce((sum, value) => sum + value, 0);

    return this.calculationService.calculateCO2FromEnergy(
      totalElectricityUsage,
      totalGasUsage
    );
  }

  generateFixedColors(length: number): string[] {
    const colors = [
      '#FF5733',
      '#33FF57',
      '#3357FF',
      '#F3FF33',
      '#FF33A1',
      '#33FFF0',
      '#7D33FF',
      '#FF8233',
      '#33FFB7',
      '#FF33D1',
      '#33C3FF',
      '#F23',
    ];

    return Array.from({ length }, (_, i) => colors[i % colors.length]);
  }
}
