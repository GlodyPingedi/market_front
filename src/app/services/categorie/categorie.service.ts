import { Injectable } from '@angular/core';
import { Categorie } from '../../models/categorie';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(
    private http: HttpClient
  ) { }

  getCategoriesList(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>('http://localhost:8000/api/categories').pipe(
      tap((categoriesList: Categorie[]) => console.log(categoriesList)),
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }

  createCategorie(categories: Categorie[]): Observable<Categorie[]> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    }
    return this.http.post<Categorie[]>('http://localhost:8000/api/categories', categories, httpOptions).pipe(
      tap((response: Categorie[]) => console.log(response)),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
