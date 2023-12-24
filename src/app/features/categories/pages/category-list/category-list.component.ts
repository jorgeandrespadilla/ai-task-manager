import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksDetailService } from '../../../../services/tasks/tasks-detail.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {

  filterForm = this.fb.group({
    name: ['']
  });

  selectedCategoryId?: string;

  @ViewChild('confirmDeletion')
  confirmDeletion!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute:ActivatedRoute,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
    private tasksDetailService: TasksDetailService
  ) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.filterForm.patchValue({
        name: params['name'] ?? ''
      });
    });
    this.filterForm.valueChanges.subscribe(() => {
      this.updateQueryParams();
    });
  }

  get categories$() {
    return this.categoriesService.getCategories().pipe(
      map(categories => categories
        .filter(category => category.name.includes(this.filterName))
      )
    );
  }

  get filterName() {
    return this.filterForm.value.name ?? '';
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
    this.tasksDetailService.isCategoryUsed(categoryId).pipe(
      tap(isUsed => {
        if (isUsed) {
          this.toastService.error('La categoría ya está en uso');
          return;
        }
        this.selectedCategoryId = categoryId;
        const modalRef = this.modalService.open(this.confirmDeletion);
        modalRef.dismissed.subscribe(() => this.cancelSelection());
      })
    ).subscribe();
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

  private updateQueryParams() {
    this.router.navigate([], {
      queryParams: {
        name: this.filterName === '' ? null : this.filterName
      },
      queryParamsHandling: 'merge'
    });
  }

}
