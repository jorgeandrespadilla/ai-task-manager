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
You will brainstorm some tasks for the user. The user will tell you what they want to do, and you will generate some tasks for them. You need to generate at most 5 tasks. Return the tasks in a list of strings. The tasks should be short, and they should be related to the user's input. Do not include any additional comment or information.
  `).trim(),
};
