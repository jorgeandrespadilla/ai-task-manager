import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
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
    private categoriesService: CategoriesService,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.isEditing) {
      this.categoriesService.getCategoryById(this.id!).pipe(
        tap(category => {
          if (!category) {
            this.toastService.error('No se encontró la categoría');
            this.router.navigate(['/categories']);
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
    this.router.navigate(['/categories']);
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
        this.router.navigate(['/categories']);
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
        this.router.navigate(['/categories']);
      })
    ).subscribe();
  }

}
