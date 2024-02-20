import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OpenAIService } from '../../../../services/ai/openai.service';
import { FormUtils } from '../../../../shared/utils';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { DEFAULT_CATEGORY } from '../../../../shared/constants/categories';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import { Category } from '../../../../shared/models/category.model';

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrl: './ai-assistant.component.scss'
})
export class AiAssistantComponent {

  assistantForm = this.fb.group({
    description: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]],
  });

  showLoader = false;

  generatedTasks: string[] | null = null;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private aiService: OpenAIService,
    private categoriesService: CategoriesService,
    private tasksService: TasksService,
  ) { }

  handleSuggestion(suggestion: string): void {
    this.assistantForm.patchValue({ description: suggestion });
  }

  generateTasks(): void {
    if (this.assistantForm.invalid) {
      this.assistantForm.markAllAsTouched();
      return;
    }

    this.showLoader = true;
    this.aiService.generateTasks(this.assistantForm.value.description!).pipe(
      tap(tasks => {
        this.generatedTasks = tasks;
        this.showLoader = false;
        this.toastr.success('Lista de tareas generada');
      }),
      catchError(() => {
        this.toastr.error('No se pudo generar la lista de tareas');
        this.showLoader = false;
        return of(null);
      }),
    ).subscribe();
  }

  saveTask(taskIndex: number): void {
    const taskName = this.generatedTasks![taskIndex];
    if (!taskName) {
      return;
    }
    this.addDefaultCategory().pipe(
      switchMap(category => this.tasksService.addTask({
        name: taskName,
        description: taskName,
        categoryId: category.id,
        completed: false,
      })),
      tap(() => {
        this.toastr.success('Tarea agregada');
        this.discardTask(taskIndex);
      }),
      catchError(() => {
        this.toastr.error('No se pudo agregar la tarea');
        return of(null);
      }),
    ).subscribe();
  }

  discardTask(taskIndex: number) {
    this.generatedTasks?.splice(taskIndex, 1);
  }

  discardTasks(): void {
    this.generatedTasks = null;
    this.assistantForm.reset();
  }

  hasFieldErrors(field: string): boolean {
    return FormUtils.hasFieldErrors(this.assistantForm, field);
  }

  getFieldError(field: string): string | null {
    return FormUtils.getFirstFieldError(this.assistantForm, field);
  }

  private addDefaultCategory(): Observable<Category> {
    return this.categoriesService.findCategoryByName(DEFAULT_CATEGORY.name).pipe(
      switchMap(category => {
        if (category) {
          return of(category);
        }
        return this.categoriesService.addCategory(DEFAULT_CATEGORY);
      }),
    );
  }

}
