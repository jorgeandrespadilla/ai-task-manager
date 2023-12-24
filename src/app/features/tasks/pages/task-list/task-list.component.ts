import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, tap } from 'rxjs';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { TasksDetailService } from '../../../../services/tasks/tasks-detail.service';
import { TaskStatusChange } from '../../../../shared/models/task.model';
import { TASK_STATE_OPTIONS } from '../../../../shared/constants/tasks';
import { TaskState } from '../../../../shared/enums/task-state.enum';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { SelectOption } from '../../../../shared/models/ui.model';

const DEFAULT_FILTER = {
  name: '',
  state: TaskState.ALL,
  categoryId: ''
};

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  filterForm = this.fb.group({
    name: [DEFAULT_FILTER.name],
    state: [DEFAULT_FILTER.state],
    categoryId: [DEFAULT_FILTER.categoryId]
  });

  states = TASK_STATE_OPTIONS;

  isAdvancedFilterCollapsed = true;

  selectedTaskId?: string;

  @ViewChild('confirmDeletion')
  confirmDeletion!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private categgoriesService: CategoriesService,
    private tasksService: TasksService,
    private tasksDetailService: TasksDetailService,
  ) { }

  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(params => {
      this.filterForm.patchValue({
        name: params['name'] ?? DEFAULT_FILTER.name,
        state: params['state'] ?? DEFAULT_FILTER.state,
        categoryId: params['category'] ?? DEFAULT_FILTER.categoryId
      });
    });
    this.filterForm.valueChanges.subscribe(() => {
      this.updateQueryParams();
    });
  }

  get tasks$() {
    return this.tasksDetailService.getTasks().pipe(
      map(tasks => tasks
        .filter(task => task.name.includes(this.filterName))
        .filter(task =>
          this.filterState === DEFAULT_FILTER.state ||
          task.completed === (this.filterState === TaskState.DONE)
        )
        .filter(task =>
          this.filterCategoryId === DEFAULT_FILTER.categoryId ||
          task.categoryId === this.filterCategoryId
        )
      )
    );
  }

  get categoriesOptions(): Observable<SelectOption[]> {
    return this.categgoriesService.getCategories().pipe(
      map(categories => {
        const options: SelectOption[] = categories.map(category => ({
          value: category.id!,
          label: category.name
        }));
        return [{ value: '', label: 'Todas' }, ...options];
      })
    );
  }

  get filterName() {
    return this.filterForm.value.name!;
  }

  get filterState() {
    return this.filterForm.value.state!;
  }

  get filterCategoryId() {
    return this.filterForm.value.categoryId!;
  }

  clearFilter() {
    this.filterForm.patchValue(DEFAULT_FILTER);
  }

  addTask() {
    this.router.navigate(['tasks', 'new']);
  }

  viewTask(taskId: string) {
    this.router.navigate(['tasks', taskId]);
  }

  editTask(taskId: string) {
    this.router.navigate(['tasks', 'edit', taskId]);
  }

  onChangeTaskStatus(statusChange: TaskStatusChange) {
    this.tasksService.updateTask({
      id: statusChange.taskId,
      completed: statusChange.completed
    }).subscribe();
  }

  confirmDeleteTask(taskId: string) {
    this.selectedTaskId = taskId;
    const modalRef = this.modalService.open(this.confirmDeletion);
    modalRef.dismissed.subscribe(() => this.cancelSelection());
  }

  cancelSelection() {
    this.selectedTaskId = undefined;
  }

  deleteTask() {
    if (!this.selectedTaskId) {
      return;
    }
    this.tasksService.deleteTask(this.selectedTaskId).pipe(
      tap(() => {
        this.toastService.success('Tarea eliminada');
        this.cancelSelection();
      })
    ).subscribe();
  }

  private updateQueryParams() {
    this.router.navigate([], {
      queryParams: {
        name: this.filterName === '' ? null : this.filterName,
        state: this.filterState === DEFAULT_FILTER.state ? null : this.filterState,
        category: this.filterCategoryId === DEFAULT_FILTER.categoryId ? null : this.filterCategoryId
      }
    });
  }

}
