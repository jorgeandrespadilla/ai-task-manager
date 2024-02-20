import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiAssistantComponent } from './pages/ai-assistant/ai-assistant.component';
import { isAiAssistanceEnabledGuard } from './guards/isAiAssistanceEnabled.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [isAiAssistanceEnabledGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AiAssistantComponent,
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
export class AiRoutingModule { }
