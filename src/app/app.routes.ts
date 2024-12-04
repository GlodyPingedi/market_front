import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./routes/categorie.routes').then(routes => routes.categorieRoutes),
    },
    {
        path: '', loadChildren: () => import('./routes/produit.routes').then(routes => routes.produitRoutes),
    },
    {
        path: '', loadChildren: () => import('./routes/vente.routes').then(routes => routes.venteRoutes),
    },
    {
        path: '', component: AppComponent,
    }
];
