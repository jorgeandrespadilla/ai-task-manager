import { Component, EventEmitter, Output } from '@angular/core';
import { TASK_SUGGESTIONS } from '../../../../shared/constants/ai';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.component.html',
  styleUrl: './suggestions-list.component.scss',
})
export class SuggestionsListComponent {
  suggestions = TASK_SUGGESTIONS;

  @Output()
  suggestionSelected = new EventEmitter<string>();

  constructor() {}

  handleSuggestionClick(suggestion: string) {
    this.suggestionSelected.emit(suggestion);
  }
}
