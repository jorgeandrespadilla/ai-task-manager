import { Location as RouterLocation } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, tap } from 'rxjs';
import { TaskDetail } from '../../../../shared/models/task.model';
import { TasksDetailService } from '../../../../services/tasks/tasks-detail.service';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { AppSettingsService } from '../../../../services/settings/app-settings.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent {

  @Input()
  public id!: string;

  @ViewChild('confirmDeletion')
  confirmDeletion!: ElementRef;

  task?: TaskDetail;

  constructor(
    private router: Router,
    private location: RouterLocation,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private tasksService: TasksService,
    private tasksDetailService: TasksDetailService,
    private settingsService: AppSettingsService
  ) { }

  ngOnInit(): void {
    this.tasksDetailService.getTaskById(this.id).pipe(
      tap(task => {
        if (!task) {
          this.toastService.error('No se encontró la tarea');
          this.router.navigate(['/tasks']);
          return;
        }
        this.task = task;
      })
    ).subscribe();
  }

  get isAIEnabled(): Observable<boolean> {
    return this.settingsService.isAIAssistanceEnabled();
  }


  editTask(): void {
    this.router.navigate(['tasks', 'edit', this.id]);
  }

  confirmDeleteTask() {
    this.modalService.open(this.confirmDeletion);
  }

  deleteTask() {
    this.tasksService.deleteTask(this.id).pipe(
      tap(() => {
        this.toastService.success('Tarea eliminada');
        this.router.navigate(['/tasks']);
      })
    ).subscribe();
  }

  goBack() {
    const routerState: any = this.location.getState() ?? {};
    if (routerState?.navigationId === 1) {
      this.router.navigate(['/tasks']);
    }
    this.location.back();
  }

}
