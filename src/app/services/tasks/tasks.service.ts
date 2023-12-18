import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { AddTask, RawTask, Task, UpdateTask } from '../../shared/models/task.model';
import { UUID } from '../../shared/utils/uuid';
import { StorageKeys } from '../../shared/enums/storage.enum';
import { LocalStorageUtils } from '../../shared/utils/storage';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }

  public getTasks(): Observable<Task[]> {
    return this.loadTasks();
  }

  public getTaskById(id: string): Observable<Task | null> {
    return this.loadTasks()
      .pipe(
        map(tasks => tasks.find(task => task.id === id) ?? null)
      );
  }

  public addTask(taskToAdd: AddTask): Observable<Task> {
    return this.loadTasks()
      .pipe(
        map(tasks => {
          const newTask: Task = {
            ...taskToAdd,
            id: UUID.generateWithoutDash(),
            createdAt: new Date(),
          };
          tasks.push(newTask);
          this.saveTasks(tasks);
          return newTask;
        })
      );
  }

  public updateTask(taskToUpdate: UpdateTask): Observable<Task> {
    return this.loadTasks()
      .pipe(
        map(tasks => {
          const taskIndex = tasks.findIndex(task => task.id === taskToUpdate.id);
          if (taskIndex === -1) {
            throw new Error(`Tarea con ID ${taskToUpdate.id} no encontrada`);
          }
          const updatedTask: Task = {
            ...tasks[taskIndex],
            ...taskToUpdate,
            updatedAt: new Date(),
          };
          tasks[taskIndex] = updatedTask;
          this.saveTasks(tasks);
          return updatedTask;
        })
      );
  }

  public deleteTask(id: string): Observable<void> {
    return this.loadTasks()
      .pipe(
        map(tasks => {
          const taskIndex = tasks.findIndex(task => task.id === id);
          if (taskIndex === -1) {
            throw new Error(`Tarea con ID ${id} no encontrada`);
          }
          tasks.splice(taskIndex, 1);
          this.saveTasks(tasks);
        })
      );
  }

  private loadTasks(): Observable<Task[]> {
    return of(LocalStorageUtils.load<RawTask[]>(StorageKeys.tasks) ?? [])
      .pipe(
        map(rawTasks => rawTasks.map(this.mapToTask))
      );
  }

  private saveTasks(tasks: Task[]): void {
    LocalStorageUtils.save(StorageKeys.tasks, tasks);
  }

  private mapToTask(rawTask: RawTask): Task {
    return {
      ...rawTask,
      createdAt: new Date(rawTask.createdAt),
      updatedAt: rawTask.updatedAt ? new Date(rawTask.updatedAt) : undefined,
    };
  }

}
