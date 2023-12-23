import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {

  selectedCategoryId?: string;

  @ViewChild('confirmDeletion')
  confirmDeletion!: ElementRef;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
  ) { }

  get categories$() {
    return this.categoriesService.getCategories();
  }

  addCategory() {
    this.router.navigate(['categories', 'new']);
  }

  viewCategory(categoryId: string) {
    this.router.navigate(['categories', categoryId]);
  }

  editCategory(categoryId: string) {
    this.router.navigate(['categories', 'edit', categoryId]);
  }

  confirmDeleteCategory(categoryId: string) {
    this.selectedCategoryId = categoryId;
    const modalRef = this.modalService.open(this.confirmDeletion);
    modalRef.dismissed.subscribe(() => this.cancelSelection());
  }

  cancelSelection() {
    this.selectedCategoryId = undefined;
  }

  deleteCategory() {
    if (!this.selectedCategoryId) {
      return;
    }
    this.categoriesService.deleteCategory(this.selectedCategoryId).pipe(
      tap(() => {
        this.toastService.success('Categoría eliminada');
        this.cancelSelection();
      })
    ).subscribe();
  }

}
