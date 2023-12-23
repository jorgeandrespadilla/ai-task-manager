import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { Category } from '../../../../shared/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss'
})
export class CategoryDetailComponent implements OnInit {

  category?: Category;

  @Input()
  public id!: string;

  @ViewChild('confirmDeletion')
  confirmDeletion!: ElementRef;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategoryById(this.id).pipe(
      tap(category => {
        if (!category) {
          this.toastService.error('No se encontró la categoría');
          this.router.navigate(['/categories']);
          return;
        }
        this.category = category;
      })
    ).subscribe();
  }

  public editCategory(): void {
    this.router.navigate(['categories', 'edit', this.id]);
  }

  confirmDeleteCategory() {
    this.modalService.open(this.confirmDeletion);
  }

  deleteCategory() {
    this.categoriesService.deleteCategory(this.id).pipe(
      tap(() => {
        this.toastService.success('Categoría eliminada');
        this.router.navigate(['/categories']);
      })
    ).subscribe();
  }

}
