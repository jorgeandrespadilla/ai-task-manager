import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AppSettings, OpenAISettings } from '../../shared/models/settings.model';
import { StorageKeys } from '../../shared/enums/storage.enum';
import { LocalStorageUtils } from '../../shared/utils/storage';
import { DEFAULT_APP_SETTINGS } from '../../shared/constants/settings';
import { Theme } from '../../shared/enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  constructor() { }

  isAIAssistanceEnabled(): Observable<boolean> {
    return this.loadSettings()
      .pipe(
        map((settings: AppSettings) => settings.enableAIAssistance)
      );
  }

  changeAIAssistanceStatus(status: boolean): void {
    this.loadSettings()
      .subscribe((settings: AppSettings) => {
        settings.enableAIAssistance = status;
        this.saveTasks(settings);
      });
  }

  getOpenAISettings(): Observable<OpenAISettings | null> {
    return this.loadSettings()
      .pipe(
        map((settings: AppSettings) => settings.openAI)
      );
  }

  setOpenAISettings(openAISettings: OpenAISettings): void {
    this.loadSettings()
      .subscribe((settings: AppSettings) => {
        settings.openAI = openAISettings;
        this.saveTasks(settings);
      });
  }

  getTheme(): Observable<Theme> {
    return this.loadSettings()
      .pipe(
        map((settings: AppSettings) => settings.theme)
      );
  }

  setTheme(theme: Theme): void {
    this.loadSettings()
      .subscribe((settings: AppSettings) => {
        settings.theme = theme;
        this.saveTasks(settings);
      });
  }

  resetApplication(): void {
    LocalStorageUtils.clear();
  }

  private loadSettings(): Observable<AppSettings> {
    return of(LocalStorageUtils.load<AppSettings>(StorageKeys.settings))
      .pipe(
        map((settings => settings ?? DEFAULT_APP_SETTINGS)
      )
    );
  }

  private saveTasks(appSettings: AppSettings): void {
    LocalStorageUtils.save(StorageKeys.settings, appSettings);
  }

}
