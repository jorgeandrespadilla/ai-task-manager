import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private ngbModalService: NgbModal
  ) { }

  open(content: any): void {
    this.ngbModalService.open(content);
  }

}
