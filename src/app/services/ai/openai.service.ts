import { Injectable } from '@angular/core';
import OpenAI from 'openai';
import { Observable, catchError, from, map, switchMap, tap } from 'rxjs';
import { ChatCompletionMessageParam } from 'openai/resources';
import { APIError } from 'openai/error';
import { AppSettingsService } from '../settings/app-settings.service';
import { OPENAI_PARAMETERS, PROMPTS } from '../../shared/constants/ai';
import { ConversationRole } from '../../shared/enums/conversation-role.enum';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {

  constructor(
    private settingsService: AppSettingsService,
  ) {
  }

  public generateTasks(description: string): Observable<string | null> {
    return this.generateCompletion(PROMPTS.generateTasks(), description);
  }

  private generateCompletion(encodedPrompt: string, input: string): Observable<string | null> {
    return this.getClient().pipe(
      switchMap(client =>
        this.getChatCompletion(client, [
          {
            role: ConversationRole.System,
            content: encodedPrompt,
          },
          {
            role: ConversationRole.User,
            content: input,
          }
        ])
      ),
    );
  }

  private getClient(): Observable<OpenAI> {
    return this.settingsService.getOpenAISettings().pipe(
      tap(settings => {
        if (!settings) {
          throw new Error('La configuración de OpenAI no se encuentra disponible.');
        }
      }),
      map(settings => new OpenAI({
        apiKey: settings!.apiKey,
        dangerouslyAllowBrowser: true,
      })),
      switchMap(client => this.validateClient(client)),
    );
  }

  private validateClient(client: OpenAI): Observable<OpenAI> {
    return from(client.models.retrieve(OPENAI_PARAMETERS.model)).pipe(
      map(() => client),
      catchError((error: APIError) => {
        const statusCode = error.status;
        if (statusCode === 401) {
          throw new Error('El API Key de OpenAI no es válido. Por favor, verifique la configuración.');
        }
        if (statusCode === 404) {
          throw new Error(`El modelo ${OPENAI_PARAMETERS.model} de OpenAI no está disponible.`);
        }
        throw new Error('Ha ocurrido un error al validar la configuración de OpenAI.');
      }),
    );
  }

  private getChatCompletion(client: OpenAI, messages: Array<ChatCompletionMessageParam>): Observable<string | null> {
    return from(
      client.chat.completions.create({
      model: OPENAI_PARAMETERS.model,
      max_tokens: OPENAI_PARAMETERS.maxTokens,
      temperature: OPENAI_PARAMETERS.temperature,
      top_p: OPENAI_PARAMETERS.topP,
      messages: messages,
      })
    ).pipe(
      map(chatCompletion => chatCompletion.choices[0]?.message.content ?? null),
    );
  }

}
