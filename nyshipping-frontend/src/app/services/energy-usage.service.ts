import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnergyUsageService {
  private apiUrl = 'http://localhost:5020/api/energy';

  constructor(private http: HttpClient) {}

  getEnergyUsage(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
