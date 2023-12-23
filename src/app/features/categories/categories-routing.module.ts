import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryFormComponent } from './pages/category-form/category-form.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new',
        component: CategoryFormComponent,
      },
      {
        path: 'edit/:id',
        component: CategoryFormComponent,
      },
      {
        path: 'edit',
        pathMatch: 'full',
        redirectTo: ''
      },
      {
        path: ':id',
        component: CategoryDetailComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: CategoryListComponent,
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
export class CategoriesRoutingModule { }
