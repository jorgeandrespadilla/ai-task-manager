import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiAssistantComponent } from './pages/ai-assistant/ai-assistant.component';
import { SharedModule } from '../../shared/shared.module';
import { AiRoutingModule } from './ai-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AiAssistantComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AiRoutingModule,
  ]
})
export class AiModule { }
