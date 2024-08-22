import { Component, OnInit, Inject } from '@angular/core';
import {
  Chart,
  registerables,
  ChartConfiguration,
  ChartType,
  ChartDataset,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { WasteDisposalService } from '../../services/waste-disposal.service';
import { CalculationService } from '../../services/calculation.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-waste-disposal-chart',
  templateUrl: './waste-disposal.component.html',
  styleUrls: ['./waste-disposal.component.scss'],
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
export class WasteDisposalComponent implements OnInit {
  public chartLabels: string[] = [];
  public mixedChartData: ChartDataset<'bar' | 'line'>[] = [];
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
  public chartTitle: string = 'NYShipping Waste Disposal Metrics 2023';
  public co2Score: number | null = null;
  public showNationalAverage: boolean = true;

  constructor(
    private wasteDisposalService: WasteDisposalService,
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
    this.wasteDisposalService.getWasteDisposalData().subscribe(
      (data) => {
        const filteredData = this.filterDataByPeriod(data, this.selectedPeriod);

        filteredData.sort(
          (a, b) => new Date(a.date).getMonth() - new Date(b.date).getMonth()
        );

        this.chartLabels = filteredData.map((item) =>
          this.formatDateLabel(item.date)
        );

        const wasteDisposedData = filteredData.map((item) =>
          Number(item.tonsDisposed)
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

        // Adjust the mixedChartData based on the selected chart type
        if (this.chartType === 'bar') {
          this.mixedChartData = [
            {
              data: wasteDisposedData,
              label: 'Tons Disposed',
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              type: 'bar',
            },
            ...(this.showNationalAverage ? [nationalAverageData] : []),
          ];
        } else if (this.chartType === 'line') {
          this.mixedChartData = [
            {
              data: wasteDisposedData,
              label: 'Tons Disposed',
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.1,
              type: 'line',
            },
            ...(this.showNationalAverage ? [nationalAverageData] : []),
          ];
        }

        // Calculate CO2 Score
        this.co2Score = this.calculateCO2FromWaste(wasteDisposedData);
      },
      (error) => {
        console.error('Failed to load data', error);
      }
    );
  }

  calculateCO2FromWaste(wasteDisposedData: number[]): number {
    const totalWaste = wasteDisposedData.reduce((sum, value) => sum + value, 0);
    return this.calculationService.calculateCO2FromWaste(totalWaste);
  }

  filterDataByPeriod(data: any[], period: string): any[] {
    const uniqueMonths = new Map();

    data.forEach((item) => {
      const month = new Date(item.date).getMonth();
      if (!uniqueMonths.has(month)) {
        uniqueMonths.set(month, item);
      }
    });

    const filteredData = Array.from(uniqueMonths.values());

    switch (period) {
      case 'Monthly':
        return filteredData;
      case 'Quarterly':
        return filteredData.filter((item, index) => index % 3 === 0);
      case 'Yearly':
        return [filteredData[0]];
      default:
        return filteredData;
    }
  }

  formatDateLabel(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions =
      this.selectedPeriod === 'Yearly'
        ? { year: 'numeric' }
        : { month: 'long' };
    return date.toLocaleDateString('en-US', options);
  }

  changeChartType(type: ChartType): void {
    this.chartType = type;
    this.updateChartTitle();
    this.loadData(); // Ensure that loadData is called after chart type change
  }

  onPeriodChange(): void {
    this.updateChartTitle();
    this.loadData();
  }

  toggleNationalAverage(): void {
    this.showNationalAverage = !this.showNationalAverage;
    this.loadData();
  }

  updateChartTitle(): void {
    const chartTypeMapping: { [key in ChartType]: string } = {
      bar: 'Bar Chart',
      line: 'Line Chart',
      scatter: 'Scatter Chart',
      bubble: 'Bubble Chart',
      pie: 'Pie Chart',
      doughnut: 'Doughnut Chart',
      polarArea: 'Polar Area Chart',
      radar: 'Radar Chart',
    };
    this.chartTitle = `NYShipping Waste Disposal Metrics 2023 - ${
      chartTypeMapping[this.chartType]
    }`;
  }

  getNationalAverageData(length: number, period: string): number[] {
    const nationalAverageValue = 10;

    if (period === 'Yearly') {
      return Array(length).fill(nationalAverageValue);
    }

    const nationalAverages = [9, 10, 11, 10, 9, 10, 11, 10, 9, 10, 11, 10];

    return nationalAverages.slice(0, length);
  }
}
