import { Location as RouterLocation } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { Category } from '../../../../shared/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksDetailService } from '../../../../services/tasks/tasks-detail.service';

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
    private location: RouterLocation,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
    private tasksDetailService: TasksDetailService
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
    this.tasksDetailService.isCategoryUsed(this.id).pipe(
      tap(isUsed => {
        if (isUsed) {
          this.toastService.error('La categoría ya está en uso');
          return;
        }
        this.modalService.open(this.confirmDeletion);
      })
    ).subscribe();
  }

  deleteCategory() {
    this.categoriesService.deleteCategory(this.id).pipe(
      tap(() => {
        this.toastService.success('Categoría eliminada');
        this.router.navigate(['/categories']);
      })
    ).subscribe();
  }

  goBack() {
    const routerState: any = this.location.getState() ?? {};
    if (routerState?.navigationId === 1) {
      this.router.navigate(['/categories']);
    }
    this.location.back();
  }

}
