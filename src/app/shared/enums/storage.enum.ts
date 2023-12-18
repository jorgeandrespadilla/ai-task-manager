const STORAGE_PREFIX = 'task-manager_';

export enum StorageKeys {
  tasks = `${STORAGE_PREFIX}tasks`,
  categories = `${STORAGE_PREFIX}categories`,
  settings = `${STORAGE_PREFIX}settings`
}
