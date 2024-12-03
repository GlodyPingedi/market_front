import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProduitService } from '../../../services/produit/produit.service';
import { Produit } from '../../../models/produit';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from '../../../models/categorie';

@Component({
  selector: 'app-index-produit',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './index-produit.component.html',
  styleUrl: './index-produit.component.css',
  providers: [ProduitService, CategorieService]
})
export class IndexProduitComponent implements OnInit, OnDestroy {
  produitsList: Produit[] = [];
  categoriesList: Categorie[] = [];
  private subscription: Subscription = new Subscription();
  private subscription_categorie: Subscription = new Subscription();
  alertStore: boolean = false;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.produitService.getProduitsList().subscribe(produits => this.produitsList = produits);
    this.subscription_categorie = this.categorieService.getCategoriesList().subscribe(categories => this.categoriesList = categories);
    this.alertStore = false;
    const success = sessionStorage.getItem('success');
    if (success === 'true') {
      this.alertStore = true;
      setTimeout(() => {
        this.alertStore = false;
      }, 3000);
      sessionStorage.removeItem('success');
    } else {
      this.alertStore = false;
    }
  }

  getCategorieName(categorieId: number | null): string {
    const categorie = this.categoriesList.find(c => c.id === categorieId);
    return categorie ? categorie.nom : 'Catégorie inconnue';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription_categorie.unsubscribe();
  }

  goToCreatePage() {
    this.router.navigate(['produits/create']);
  }
}
