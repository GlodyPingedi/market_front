import { Routes } from "@angular/router";
import { IndexProduitComponent } from "../pages/produits/index-produit/index-produit.component";
import { CreateProduitComponent } from "../pages/produits/create-produit/create-produit.component";

export const produitRoutes: Routes = [
    { path: 'produits', component: IndexProduitComponent },
    { path: 'produits/create', component: CreateProduitComponent }
]