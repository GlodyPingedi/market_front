import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCategorieComponent } from './index-categorie.component';

describe('IndexCategorieComponent', () => {
  let component: IndexCategorieComponent;
  let fixture: ComponentFixture<IndexCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
