import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Fund } from '../models/Fund';
import { Scheme } from '../models/Scheme';
import { IndividualNav } from '../models/IndividualNav';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor(private http: HttpClient) {}
  private dataUrl = 'https://localhost:7114/api/Nav/'; // ✅ Path to JSON file

  getFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.dataUrl + 'visible-funds');
  }

  getScheme(fundId: string): Observable<Scheme[]> {
    return this.http.get<Scheme[]>(
      this.dataUrl + `visible-scheme?fundId=${fundId}`
    );
  }
  getIndividualNav(
    fundId: string,
    schemeId: string,
    startDate: string,
    endDate: string
  ): Observable<IndividualNav> {
    return this.http.get<IndividualNav>(
      this.dataUrl +
        `GetIndividualNav?fundId=${fundId}&schemeId=${schemeId}&startDate=${startDate}&endDate=${endDate}`
    );
  }
}
