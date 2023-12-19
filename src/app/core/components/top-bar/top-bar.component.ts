import { Component } from '@angular/core';
import { MENU_ITEMS } from '../../../shared/constants/ui';
import { ViewportUtils } from '../../../shared/utils';
import { Viewport } from '../../../shared/enums/viewport.enum';
import { SettingsDialogComponent } from '../../../shared/components/settings-dialog/settings-dialog.component';
import { ModalService } from '../../../services/ui/modal.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  public menuItems = MENU_ITEMS;
  public isMenuCollapsed = true;

  constructor(
    private modalService: ModalService
  ) { }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  onMenuItemSelected() {
    if (ViewportUtils.isViewportAbove(Viewport.LARGE)) {
      console.log('Viewport is above LARGE');
      return;
    }
    this.isMenuCollapsed = true;
  }

  openSettingsDialog() {
    this.modalService.open(SettingsDialogComponent);
  }

}
