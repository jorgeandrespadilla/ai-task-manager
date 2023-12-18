import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../settings/app-settings.service';
import { BOOTSTRAP_THEME_ATTRIBUTE as THEME_ATTRIBUTE } from '../../shared/constants/ui';
import { Theme } from '../../shared/enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(
    private settingsService: AppSettingsService
  ) { }

  getTheme(): Observable<Theme> {
    return this.settingsService.getTheme();
  }

  setTheme(theme: Theme): void {
    this.settingsService.setTheme(theme);
    this.configureThemeStyle(theme);
  }

  private configureThemeStyle(theme: Theme): void {
    let themeToSet = theme;
    if (theme === Theme.AUTO) {
      themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;
    }
    document.documentElement.setAttribute(THEME_ATTRIBUTE, themeToSet);
  }

}
