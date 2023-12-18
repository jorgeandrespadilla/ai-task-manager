import { Injectable } from '@angular/core';
import { AddCategory, Category, RawCategory, UpdateCategory } from '../../shared/models/category.model';
import { Observable, map, of } from 'rxjs';
import { LocalStorageUtils } from '../../shared/utils/storage';
import { StorageKeys } from '../../shared/enums/storage.enum';
import { UUID } from '../../shared/utils/uuid';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  public getCategories(): Observable<Category[]> {
    return this.loadCategories();
  }

  public getCategoryById(id: string): Observable<Category | null> {
    return this.loadCategories()
      .pipe(
        map(categories => categories.find(category => category.id === id) ?? null)
      );
  }

  public addCategory(categoryToAdd: AddCategory): Observable<Category> {
    return this.loadCategories()
      .pipe(
        map(categories => {
          const newCategory: Category = {
            ...categoryToAdd,
            id: UUID.generateWithoutDash(),
            createdAt: new Date(),
          };
          categories.push(newCategory);
          this.saveCategories(categories);
          return newCategory;
        })
      );
  }

  public updateCategory(categoryToUpdate: UpdateCategory): Observable<Category> {
    return this.loadCategories()
      .pipe(
        map(categories => {
          const categoryIndex = categories.findIndex(category => category.id === categoryToUpdate.id);
          if (categoryIndex === -1) {
            throw new Error(`Categoría con ID ${categoryToUpdate.id} no encontrada`);
          }
          const updatedCategory: Category = {
            ...categories[categoryIndex],
            ...categoryToUpdate,
            updatedAt: new Date(),
          };
          categories[categoryIndex] = updatedCategory;
          this.saveCategories(categories);
          return updatedCategory;
        })
      );
  }

  public deleteCategory(id: string): Observable<void> {
    return this.loadCategories()
      .pipe(
        map(categories => {
          const categoryIndex = categories.findIndex(category => category.id === id);
          if (categoryIndex === -1) {
            throw new Error(`Categoría con ID ${id} no encontrada`);
          }
          categories.splice(categoryIndex, 1);
          this.saveCategories(categories);
        })
      );
  }

  private loadCategories(): Observable<Category[]> {
    return of(LocalStorageUtils.load<RawCategory[]>(StorageKeys.categories) ?? [])
      .pipe(
        map(rawCategories => rawCategories.map(this.mapToCategory))
      );
  }

  private saveCategories(categories: Category[]): void {
    LocalStorageUtils.save(StorageKeys.categories, categories);
  }

  private mapToCategory(rawCategory: RawCategory): Category {
    return {
      ...rawCategory,
      createdAt: new Date(rawCategory.createdAt),
      updatedAt: rawCategory.updatedAt ? new Date(rawCategory.updatedAt) : undefined,
    };
  }

}
