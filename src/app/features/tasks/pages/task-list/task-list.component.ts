import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TasksService } from '../../../../services/tasks/tasks.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  selectedTaskId?: string;

  @ViewChild('confirmDeletion')
  confirmDeletion!: ElementRef;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private tasksService: TasksService,
  ) { }

  get tasks$() {
    return this.tasksService.getTasks();
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

}
