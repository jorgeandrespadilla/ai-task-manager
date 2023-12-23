import { Component, Input, OnInit } from '@angular/core';
import { Location as RouterLocation } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { FormUtils } from '../../../../shared/utils';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {

  @Input()
  id?: string;

  public categoryForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  /**
   * Returns true if the component is in editing mode, false otherwise.
   */
  get isEditing(): boolean {
    return Boolean(this.id);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: RouterLocation,
    private categoriesService: CategoriesService,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.isEditing) {
      this.categoriesService.getCategoryById(this.id!).pipe(
        tap(category => {
          if (!category) {
            this.toastService.error('No se encontró la categoría');
            this.goToPreviousPage();
            return;
          }
          this.categoryForm.patchValue({
            name: category.name,
            description: category.description,
          });
        })
      ).subscribe();
    }
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    if (this.isEditing) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  cancel() {
    this.categoryForm.reset();
    this.goToPreviousPage();
  }

  hasFieldErrors(field: string): boolean {
    return FormUtils.hasFieldErrors(this.categoryForm, field);
  }

  getFieldError(field: string): string | null {
    return FormUtils.getFirstFieldError(this.categoryForm, field);
  }

  private addCategory() {
    this.categoriesService.addCategory({
      description: this.categoryForm.get('description')?.value!,
      name: this.categoryForm.get('name')?.value!,
    }).pipe(
      tap(() => {
        this.toastService.success('Categoría creada');
        this.goToPreviousPage();
      })
    ).subscribe();
  }

  private updateCategory() {
    this.categoriesService.updateCategory({
      id: this.id!,
      description: this.categoryForm.get('description')?.value!,
      name: this.categoryForm.get('name')?.value!,
    }).pipe(
      tap(() => {
        this.toastService.success('Categoría actualizada');
        this.goToPreviousPage();
      })
    ).subscribe();
  }

  private goToPreviousPage() {
    const routerState: any = this.location.getState() ?? {};
    if (routerState?.navigationId === 1) {
      this.router.navigate(['/categories']);
    }
    this.location.back();
  }

}
