import { Location as RouterLocation } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { FormUtils } from '../../../../shared/utils';
import { CategoriesService } from '../../../../services/categories/categories.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {

  @Input()
  id?: string;

  public taskForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    completed: [false, Validators.required],
    categoryId: ['', Validators.required],
  });

  /**
   * Returns true if the component is in editing mode, false otherwise.
   */
  get isEditing(): boolean {
    return Boolean(this.id);
  }

  constructor(
    private location: RouterLocation,
    private fb: FormBuilder,
    private router: Router,
    private categoriesService: CategoriesService,
    private tasksService: TasksService,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.isEditing) {
      this.tasksService.getTaskById(this.id!).pipe(
        tap(task => {
          if (!task) {
            this.toastService.error('No se encontró la tarea');
            this.goToPreviousPage();
            return;
          }
          this.taskForm.patchValue({
            name: task.name,
            description: task.description,
            completed: task.completed,
            categoryId: task.categoryId,
          });
        })
      ).subscribe();
    }
  }

  get categories() {
    return this.categoriesService.getCategories();
  }

  saveTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    if (this.isEditing) {
      this.updateTask();
    } else {
      this.addTask();
    }
  }

  cancel() {
    this.taskForm.reset();
    this.goToPreviousPage();
  }

  hasFieldErrors(field: string): boolean {
    return FormUtils.hasFieldErrors(this.taskForm, field);
  }

  getFieldError(field: string): string | null {
    return FormUtils.getFirstFieldError(this.taskForm, field);
  }

  private addTask() {
    console.log(this.taskForm.value)
    this.tasksService.addTask({
      description: this.taskForm.get('description')?.value!,
      name: this.taskForm.get('name')?.value!,
      categoryId: this.taskForm.get('categoryId')?.value!,
      completed: this.taskForm.get('completed')?.value!,
    }).pipe(
      tap(() => {
        this.toastService.success('Tarea creada');
        this.goToPreviousPage();
      })
    ).subscribe();
  }

  private updateTask() {
    this.tasksService.updateTask({
      id: this.id!,
      description: this.taskForm.get('description')?.value!,
      name: this.taskForm.get('name')?.value!,
      categoryId: this.taskForm.get('categoryId')?.value!,
      completed: this.taskForm.get('completed')?.value!,
    }).pipe(
      tap(() => {
        this.toastService.success('Tarea actualizada');
        this.goToPreviousPage();
      })
    ).subscribe();
  }

  private goToPreviousPage() {
    const routerState: any = this.location.getState() ?? {};
    if (routerState?.navigationId === 1) {
      this.router.navigate(['/tasks']);
    }
    this.location.back();
  }

}
