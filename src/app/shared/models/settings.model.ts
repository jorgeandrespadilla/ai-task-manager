import { Theme } from "../enums/theme.enum";

export interface OpenAISettings {
  apiKey: string;
}

export interface AppSettings {
  enableAIAssistance: boolean;
  theme: Theme;
  openAI: OpenAISettings | null;
}
