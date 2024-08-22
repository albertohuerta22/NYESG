import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WaterUsageService {
  private apiUrl = 'http://localhost:5020/api/WaterUsage'; // Update this to match your Swagger URL

  constructor(private http: HttpClient) {}

  getWaterUsageData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
