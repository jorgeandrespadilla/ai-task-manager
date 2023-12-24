import { TaskState } from "../enums/task-state.enum";
import { SelectOption } from "../models/ui.model";

export const TASK_STATE_OPTIONS: SelectOption[] = [
  {
    label: 'Todas',
    value: TaskState.ALL,
  },
  {
    label: 'Pendientes',
    value: TaskState.PENDING,
  },
  {
    label: 'Completadas',
    value: TaskState.DONE,
  },
];
