import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../../models/produit';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private baseUrl = 'http://localhost:8000/api/produits';

  constructor(private http: HttpClient) { }

  getProduitsList(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.baseUrl).pipe(
      tap((produitsList: Produit[]) => console.log(produitsList)),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createProduit(produits: Produit[]): Observable<Produit[]> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http.post<Produit[]>(this.baseUrl, produits, httpOptions).pipe(
      tap((response: Produit[]) => console.log(response)),
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  // Nouvelle méthode pour récupérer un produit par code_barre
  getProduitByCodeBarre(codeBarre: string): Observable<Produit> {
    const url = `${this.baseUrl}/${codeBarre}`;
    return this.http.get<Produit>(url).pipe(
      tap((produit: Produit) => console.log(`Produit trouvé:`, produit)),
      catchError((error) => {
        console.error(`Erreur lors de la récupération du produit:`, error);
        return throwError(error);
      })
    );
  }
}
