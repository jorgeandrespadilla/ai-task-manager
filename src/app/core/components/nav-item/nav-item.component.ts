import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../shared/models/ui.model';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {

  @Input({ required: true })
  public item!: MenuItem;

  @Output()
  public menuItemSelected = new EventEmitter<MenuItem>();

  onMenuItemSelected(): void {
    this.menuItemSelected.emit(this.item);
  }

}
