import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { map, tap } from 'rxjs';
import { TasksDetailService } from '../../../../services/tasks/tasks-detail.service';
import { TaskStatusChange } from '../../../../shared/models/task.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {

  filterForm = this.fb.group({
    name: ['']
  });

  selectedTaskId?: string;

  @ViewChild('confirmDeletion')
  confirmDeletion!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private tasksService: TasksService,
    private tasksDetailService: TasksDetailService,
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

  get tasks$() {
    return this.tasksDetailService.getTasks().pipe(
      map(tasks => tasks
        .filter(task => task.name.includes(this.filterName))
      )
    );
  }

  get filterName() {
    return this.filterForm.value.name ?? '';
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
        name: this.filterName === '' ? null : this.filterName
      },
      queryParamsHandling: 'merge'
    });
  }

}
