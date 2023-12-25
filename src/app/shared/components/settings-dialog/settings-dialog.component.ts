import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSettingsService } from '../../../services/settings/app-settings.service';
import { conditionalValidator } from '../../validators/conditional.validator';
import { FormUtils } from '../../utils';
import { forkJoin, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss'
})
export class SettingsDialogComponent implements OnInit {

  @ViewChild('confirmReset')
  confirmReset!: ElementRef;

  public settingsForm = this.fb.group({
    enableAIAssistance: [false],
    openAIApiKey: ['', [
      conditionalValidator(
        control => {
          return control.get('enableAIAssistance')?.value === true
        },
        Validators.required
      )
    ]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private settingsService: AppSettingsService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.loadSettings();
    this.settingsForm.get('enableAIAssistance')?.valueChanges
      .subscribe(value => {
        this.settingsForm.get('openAIApiKey')?.updateValueAndValidity();
      }); // Run validation when the checkbox is toggled
  }

  loadSettings() {
    forkJoin([
      this.settingsService.isAIAssistanceEnabled(),
      this.settingsService.getOpenAISettings()
    ]).pipe(
      take(1),
      tap(([aiAssistanceEnabled, openAISettings]) => {
        this.settingsForm.patchValue({
          enableAIAssistance: aiAssistanceEnabled,
          openAIApiKey: openAISettings?.apiKey ?? ''
        });
      })
    ).subscribe();
  }

  saveSettings() {
    if (this.settingsForm.invalid) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    const enableAIAssistance = this.settingsForm.get('enableAIAssistance')?.value ?? false;
    this.settingsService.changeAIAssistanceStatus(enableAIAssistance),
    this.settingsService.setOpenAISettings({
      apiKey: enableAIAssistance
        ? (this.settingsForm.get('openAIApiKey')?.value ?? '')
        : ''
    })
    this.settingsForm.reset();
    this.activeModal.close();
  }

  close() {
    this.settingsForm.reset();
    this.activeModal.close();
  }

  confirmResetApplication() {
    this.modalService.open(this.confirmReset);
  }

  reset() {
    this.settingsService.resetApplication();
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
    this.activeModal.close();
  }

  hasFieldErrors(field: string): boolean {
    return FormUtils.hasFieldErrors(this.settingsForm, field);
  }

  getFieldError(field: string): string | null {
    return FormUtils.getFirstFieldError(this.settingsForm, field);
  }

}

