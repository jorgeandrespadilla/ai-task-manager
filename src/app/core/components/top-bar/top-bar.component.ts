import { Component } from '@angular/core';
import { MENU_ITEMS } from '../../../shared/constants/menu';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

  public menuItems = MENU_ITEMS;
  public isMenuCollapsed = false;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

}
