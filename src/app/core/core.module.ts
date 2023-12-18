import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavItemComponent } from './components/nav-item/nav-item.component';


@NgModule({
  declarations: [
    ThemePickerComponent,
    TopBarComponent,
    MainLayoutComponent,
    NavItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
  ],
  exports: [
    MainLayoutComponent,
  ]
})
export class CoreModule { }
