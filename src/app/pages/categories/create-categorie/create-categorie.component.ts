import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categorie } from '../../../models/categorie';
import { Router } from '@angular/router';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-categorie',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.css'],
  providers: [CategorieService]
})
export class CreateCategorieComponent implements OnInit {

  sendCategories?: Categorie[];
  categorie?: Categorie;

  constructor(
    private categorieService: CategorieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sendCategories = [];
    this.categorie = new Categorie();
  }

  onSubmit() {
    if (this.categorie) {
      this.sendCategories?.push(this.categorie);
      console.log("sendCategories après ajout :", this.sendCategories);
      this.categorie = new Categorie();
    }
  }

  removeItem(categorie: Categorie) {
    if (this.sendCategories) {
      this.sendCategories = this.sendCategories.filter(c => c !== categorie);
    }
  }

  validCreated() {
    if (this.sendCategories) {
      console.log(this.sendCategories);

      this.categorieService.createCategorie(this.sendCategories).subscribe((categories) => {
        sessionStorage.setItem('success', 'true');
        this.router.navigate(['/categories']);
      });
    }
  }

}
