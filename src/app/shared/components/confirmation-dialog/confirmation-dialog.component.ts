import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  @Input({ required: true })
  activeModal!: NgbActiveModal;

  @Input({ required: true })
  title!: string;

  @Input()
  danger: boolean = false;

  @Output()
  confirm: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  confirmButtonClass() {
    return this.danger ? 'btn-danger' : 'btn-primary';
  }

  cancelButtonClass() {
    return this.danger ? 'btn-outline-primary' : 'btn-outline-secondary';
  }

  onCancel() {
    this.cancel.emit();
    this.activeModal.close();
  }

  onConfirm() {
    this.confirm.emit();
    this.activeModal.close();
  }

}
