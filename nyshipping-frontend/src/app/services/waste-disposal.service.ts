import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WasteDisposalService {
  private apiUrl = 'http://localhost:5020/api/WasteDisposal'; // Replace with your actual backend API endpoint

  constructor(private http: HttpClient) {}

  getWasteDisposalData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
