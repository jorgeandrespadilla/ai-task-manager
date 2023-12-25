import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { TopBarComponent } from './top-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';
import { NavItemComponent } from '../nav-item/nav-item.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TopBarComponent,
        ThemePickerComponent,
        NavItemComponent
      ],
      imports: [
        RouterTestingModule,
        NgbModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
