import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { TaskItemComponent } from './task-item.component';
import { SharedModule } from '../../../../shared/shared.module';
import { TaskDetail, TaskStatusChange } from '../../../../shared/models/task.model';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

const mockTask: TaskDetail = {
  id: '1',
  name: 'Sample Task',
  completed: false,
  categoryId: '2',
  category: { id: '2', name: 'Sample Category', createdAt: new Date() },
  createdAt: new Date()
};

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        NgbTooltipModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit statusChanged event on changeTaskStatus()', () => {
    spyOn(component.statusChanged, 'emit');

    component.changeTaskStatus();

    expect(component.statusChanged.emit).toHaveBeenCalledWith({
      taskId: mockTask.id,
      completed: !mockTask.completed
    } as TaskStatusChange);
  });

  it('should navigate to category detail on viewCategoryDetail()', () => {
    spyOn(router, 'navigate');

    component.viewCategoryDetail();

    expect(router.navigate).toHaveBeenCalledWith(['/categories', mockTask.categoryId]);
  });

});
