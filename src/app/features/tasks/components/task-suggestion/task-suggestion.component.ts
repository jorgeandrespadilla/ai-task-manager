import { Component, Input } from '@angular/core';
import { OpenAIService } from '../../../../services/ai/openai.service';
import { TaskDetail } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-task-suggestion',
  templateUrl: './task-suggestion.component.html',
  styleUrl: './task-suggestion.component.scss',
})
export class TaskSuggestionComponent {

  @Input({ required: true })
  task!: TaskDetail;

  isLoadingSuggestion: boolean = false;

  taskSuggestion?: string;

  constructor(
    private aiService: OpenAIService,
  ) { }

  generateSuggestion(): void {
    this.isLoadingSuggestion = true;
    this.aiService.generateSuggestedPlan(this.task).subscribe({
      next: suggestion => this.taskSuggestion = suggestion,
      error: () => this.taskSuggestion = 'No fue posible generar una sugerencia para esta tarea.',
      complete: () => this.isLoadingSuggestion = false
    });
  }

}
