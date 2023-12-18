import { Theme } from "../enums/theme.enum";
import { DropdownItem, MenuItem } from "../models/ui.model";

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Tareas',
    icon: 'bi-check-square',
    link: 'tasks',
  },
  {
    label: 'Categorías',
    icon: 'bi-tags',
    link: 'categories',
  },
];

export const THEME_OPTIONS: DropdownItem[] = [
  {
    label: 'Claro',
    icon: 'bi-brightness-high',
    value: Theme.LIGHT,
  },
  {
    label: 'Oscuro',
    icon: 'bi-moon',
    value: Theme.DARK,
  },
  {
    label: 'Automático',
    icon: 'bi-circle-half',
    value: Theme.AUTO,
  }
];

export const BOOTSTRAP_THEME_ATTRIBUTE = 'data-bs-theme';
