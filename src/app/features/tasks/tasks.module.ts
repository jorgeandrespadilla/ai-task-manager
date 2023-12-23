import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TaskItemComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    SharedModule,
    NgbTooltipModule
  ]
})
export class TasksModule { }
