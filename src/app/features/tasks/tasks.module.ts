import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskSuggestionComponent } from './components/task-suggestion/task-suggestion.component';


@NgModule({
  declarations: [
    TaskSuggestionComponent,
    TaskItemComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    SharedModule,
    NgbCollapseModule,
    NgbTooltipModule
  ]
})
export class TasksModule { }
