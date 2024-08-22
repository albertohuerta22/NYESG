import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnergyUsageService {
  private apiUrl = 'http://localhost:5020/api/energy'; // Replace with your actual backend API endpoint

  constructor(private http: HttpClient) {}

  getEnergyUsage(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
