import { Theme } from "../enums/theme.enum";
import { AppSettings } from "../models/settings.model";

export const DEFAULT_APP_SETTINGS: AppSettings = {
  enableAIAssistance: false,
  theme: Theme.AUTO,
  openAI: null,
};
