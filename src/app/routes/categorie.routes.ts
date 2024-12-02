import { Routes } from '@angular/router';
import { IndexCategorieComponent } from '../pages/categories/index-categorie/index-categorie.component';
import { CreateCategorieComponent } from '../pages/categories/create-categorie/create-categorie.component';


export const categorieRoutes: Routes = [
    { path: 'categories', component: IndexCategorieComponent },
    { path: 'categories/create', component: CreateCategorieComponent }
];
