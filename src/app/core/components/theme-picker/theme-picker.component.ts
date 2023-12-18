import { Component, OnInit } from '@angular/core';
import { THEME_OPTIONS } from '../../../shared/constants/ui';
import { ThemeService } from '../../../services/ui/theme.service';
import { DropdownItem } from '../../../shared/models/ui.model';
import { DEFAULT_APP_SETTINGS } from '../../../shared/constants/settings';
import { Theme } from '../../../shared/enums/theme.enum';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss'
})
export class ThemePickerComponent implements OnInit {

  public themes = THEME_OPTIONS;

  public selectedTheme!: DropdownItem;

  constructor(
     private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.getTheme().subscribe(theme => {
      const themeToSelect = this.themes.find(t => t.value === theme)
        ?? this.themes.find(t => t.value === DEFAULT_APP_SETTINGS.theme) as DropdownItem;
      this.selectTheme(themeToSelect);
    });
  }

  selectTheme(theme: DropdownItem) {
    this.selectedTheme = theme;
    this.themeService.setTheme(theme.value as Theme);
  }

  isThemeSelected(theme: DropdownItem): boolean {
    return this.selectedTheme && this.selectedTheme.value === theme.value;
  }

}
