import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../../models/produit';
import { ProduitService } from '../../../services/produit/produit.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Categorie } from '../../../models/categorie';
import { Subscription } from 'rxjs';
import { CategorieService } from '../../../services/categorie/categorie.service';

@Component({
  selector: 'app-create-produit',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-produit.component.html',
  styleUrl: './create-produit.component.css',
  providers: [ProduitService, CategorieService]
})
export class CreateProduitComponent implements OnInit, OnDestroy {

  sendProduits?: Produit[];
  produit?: Produit;
  categoriesList: Categorie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sendProduits = [];
    this.produit = new Produit;
    this.subscription = this.categorieService.getCategoriesList().subscribe(categories => this.categoriesList = categories);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.produit) {
      this.sendProduits?.push(this.produit);
      console.log("Tableau :", this.sendProduits);
      this.produit = new Produit();
    }
  }

  removeItem(produit: Produit) {
    if (this.sendProduits) {
      this.sendProduits = this.sendProduits.filter(p => p !== produit);
    }
  }

  validCreated() {
    if (this.sendProduits) {
      this.produitService.createProduit(this.sendProduits).subscribe((produits) => {
        sessionStorage.setItem('success', 'true');
        this.router.navigate(['/produits']);
      });
    }
  }
}
