import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap, take } from 'rxjs';
import { Task, TaskDetail } from '../../shared/models/task.model';
import { CategoriesService } from '../categories/categories.service';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class TasksDetailService {

  constructor(
    private categoriesService: CategoriesService,
    private tasksService: TasksService
  ) { }

  public getTasks(): Observable<TaskDetail[]> {
    return forkJoin([
      this.tasksService.getTasks(),
      this.categoriesService.getCategories(),
    ]).pipe(
      take(1),
      map(([tasks, categories]) => {
        return tasks.map(task => {
          const category = categories.find(category => category.id === task.categoryId);
          return {
            ...task,
            category,
          } as TaskDetail;
        });
      })
    );
  }

  public getTaskById(id: string): Observable<TaskDetail | null> {
    return this.tasksService.getTaskById(id).pipe(
    switchMap(task => {
          if (!task) {
            return of(null);
          }
          return this.getTaskWithCategory(task);
        })
      );
  }

  public isCategoryUsed(categoryId: string): Observable<boolean> {
    return this.tasksService.getTasks().pipe(
      take(1),
      map(tasks => tasks.some(task => task.categoryId === categoryId))
    );
  }

  private getTaskWithCategory(task: Task): Observable<TaskDetail | null> {
    return this.categoriesService.getCategoryById(task.categoryId).pipe(
      map(category => {
        if (!category) {
          return null;
        }
        return {
          ...task,
          category
        } as TaskDetail;
      })
    );
  }

}
