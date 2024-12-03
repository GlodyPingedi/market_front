import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from '../../models/produit';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(
    private http: HttpClient
  ) { }

  getProduitsList(): Observable<Produit[]> {
    return this.http.get<Produit[]>('http://localhost:8000/api/produits').pipe(
      tap((produitsList: Produit[]) => console.log(produitsList)),
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }

  createProduit(produits: Produit[]): Observable<Produit[]> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    }
    return this.http.post<Produit[]>('http://localhost:8000/api/produits', produits, httpOptions).pipe(
      tap((response: Produit[]) => console.log(response)),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
