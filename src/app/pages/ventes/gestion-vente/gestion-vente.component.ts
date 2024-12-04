import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../../models/produit';
import { ProduitService } from '../../../services/produit/produit.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Categorie } from '../../../models/categorie';
import { Subscription } from 'rxjs';
import { VenteService } from '../../../services/vente/vente.service';
import { DetailVente } from '../../../models/DetailVente';

@Component({
  selector: 'app-gestion-vente',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './gestion-vente.component.html',
  styleUrl: './gestion-vente.component.css',
  providers: [ProduitService, VenteService]
})
export class GestionVenteComponent implements OnInit, OnDestroy {
  ventesList?: DetailVente[];
  vente?: DetailVente;
  produit?: Produit;
  addProduit?: Produit[];
  categoriesList: Categorie[] = [];
  codeBarre: string = '';
  private subscription: Subscription = new Subscription();

  constructor(
    private produitService: ProduitService,
    private venteService: VenteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ventesList = [];
    this.vente = new DetailVente;
    this.produit = new Produit;
    this.addProduit = [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProduit() {
    if (!this.codeBarre || !this.codeBarre.trim()) {
      console.log('Le code barre ne peut pas être vide.');
      return;
    }

    this.produitService.getProduitByCodeBarre(this.codeBarre.trim()).subscribe({
      next: (data: Produit) => {
        this.produit = data;
        if (this.produit) {
          this.vente!.prix_unitaire = this.produit.prix_unitaire;
          this.vente!.produit_id = this.produit.id;
          this.addProduit?.push(this.produit);
          this.calculerSousTotal();
        }
      },
      error: (err) => {
        this.produit = new Produit;
        this.vente = new DetailVente;
        console.error('Erreur lors de la recherche du produit :', err);
      },
    });
  }

  calculerSousTotal() {
    this.vente!.sous_total = this.vente!.quantite * this.vente!.prix_unitaire;
  }

  updateSousTotal(vente: DetailVente) {
    if (this.ventesList) {
      const index = this.ventesList.findIndex(v => v.produit_id === vente.produit_id);

      if (index !== -1) {
        this.ventesList[index].quantite = vente.quantite;
        this.ventesList[index].sous_total = vente.prix_unitaire * vente.quantite;
      }
      console.log(this.ventesList);

    }
  }

  calculerTotal() {
    return this.ventesList?.reduce((total, item) => total + item.sous_total, 0);
  }

  getNomProduit(produit_id: number) {
    let produit = this.addProduit?.find(p => p.id === produit_id);
    return produit?.nom ?? '';
  }

  onSubmit() {

    if (this.vente) {
      this.ventesList?.push(this.vente);
      this.calculerTotal();
      this.produit = new Produit();
      this.vente = new DetailVente();
      this.codeBarre = '';
    }
    console.log(this.ventesList);

  }

  removeItem(vente: DetailVente) {
    if (this.ventesList) {
      this.ventesList = this.ventesList.filter(v => v !== vente);
    }
  }

  validCreated() {
    if (this.ventesList) {
      this.venteService.createVente(this.ventesList).subscribe((ventes) => {
        console.log(ventes);
        alert('vente reussie')
      });
      console.log(this.ventesList);
      this.ventesList = [];
      this.vente = new DetailVente;
      this.produit = new Produit;
      this.addProduit = [];
    }
  }
}
