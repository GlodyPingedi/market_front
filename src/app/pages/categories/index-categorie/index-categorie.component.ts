import { Component, OnDestroy, OnInit } from '@angular/core';
import { Categorie } from '../../../models/categorie';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-categorie',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './index-categorie.component.html',
  styleUrl: './index-categorie.component.css',
  providers: [CategorieService]
})
export class IndexCategorieComponent implements OnInit, OnDestroy {

  categoriesList: Categorie[] = [];
  private subscription: Subscription = new Subscription();
  alertStore: boolean = false;

  constructor(
    private categorieService: CategorieService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscription = this.categorieService.getCategoriesList().subscribe(categories => this.categoriesList = categories);
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToCreatePage() {
    this.router.navigate(['categories/create']);
  }

}
