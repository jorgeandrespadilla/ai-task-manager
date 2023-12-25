import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { LottieAnimationComponent } from './components/lottie-animation/lottie-animation.component';
import { LottieComponent } from 'ngx-lottie';


@NgModule({
  declarations: [
    SettingsDialogComponent,
    ListItemComponent,
    ConfirmationDialogComponent,
    LottieAnimationComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    LottieComponent,
  ],
  exports: [
    SettingsDialogComponent,
    ListItemComponent,
    ConfirmationDialogComponent,
    LottieAnimationComponent,
  ]
})
export class SharedModule { }
