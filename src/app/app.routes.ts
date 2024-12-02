import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./routes/categorie.routes').then(routes => routes.categorieRoutes),
    },
    {
        path: '', component: AppComponent,
    }
];
