import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailComponent } from './pages/task-detail/task-detail.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new',
        component: TaskFormComponent,
      },
      {
        path: 'edit/:id',
        component: TaskFormComponent,
      },
      {
        path: 'edit',
        pathMatch: 'full',
        redirectTo: ''
      },
      {
        path: ':id',
        component: TaskDetailComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: TaskListComponent,
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
