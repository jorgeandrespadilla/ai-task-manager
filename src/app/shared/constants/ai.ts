import { SelectOption } from "../models/ui.model";

export const OPENAI_PARAMETERS = {
  model: 'gpt-3.5-turbo',
  temperature: 0.5,
  maxTokens: 512,
  topP: 1,
};

const INITIAL_PROMPT = `You are a task manager assistant. You are helping a user to manage their tasks.`;

export const PROMPTS = {
  generateTasks: () => (`
${INITIAL_PROMPT}
You will brainstorm some tasks for the user. The user will tell you what they want to do, and you will generate some tasks for them. You need to generate 5 tasks with line breaks between them. The tasks should be short, and they should be related to the user's input. Do not include any additional comment or information. Answer the user's request as directly as possible. Use the same language that the user used.

Example:
User: I want to learn how to play the guitar.
Assistant:
- Find a guitar teacher
- Buy a guitar
- Take guitar lessons
- Practice playing the guitar
  `).trim(),
};
