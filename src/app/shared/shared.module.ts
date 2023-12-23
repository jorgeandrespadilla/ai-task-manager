import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingsDialogComponent } from './components/settings-dialog/settings-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    SettingsDialogComponent,
    ListItemComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    SettingsDialogComponent,
    ListItemComponent,
    ConfirmationDialogComponent,
  ]
})
export class SharedModule { }
