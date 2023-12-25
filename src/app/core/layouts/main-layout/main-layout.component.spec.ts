import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { MainLayoutComponent } from './main-layout.component';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { ThemePickerComponent } from '../../components/theme-picker/theme-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavItemComponent } from '../../components/nav-item/nav-item.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MainLayoutComponent,
        TopBarComponent,
        ThemePickerComponent,
        NavItemComponent
      ],
      imports: [
        RouterTestingModule,
        NgbModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
