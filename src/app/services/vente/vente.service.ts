import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { DetailVente } from '../../models/DetailVente';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  private baseUrl = 'http://localhost:8000/api/ventes';

  constructor(private http: HttpClient) { }

  createVente(detailVente: DetailVente[]): Observable<DetailVente[]> {

    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http.post<DetailVente[]>(this.baseUrl, detailVente, httpOptions).pipe(
      tap((response: DetailVente[]) => console.log(response)),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
