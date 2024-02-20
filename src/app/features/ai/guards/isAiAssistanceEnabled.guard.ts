import { Router, type CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Location as RouterLocation } from '@angular/common';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsService } from '../../../services/settings/app-settings.service';

export const isAiAssistanceEnabledGuard: CanActivateFn = (route, state) => {
  const settingsService = inject(AppSettingsService);
  const toastService = inject(ToastrService);
  const router = inject(Router);
  const location = inject(RouterLocation);

  return settingsService.isAIAssistanceEnabled().pipe(
    tap(isEnabled => {
      if (!isEnabled) {
        toastService.error('La asistencia de IA se encuentra deshabilitada.');
        if (!location.getState()) {
          router.navigate(['/']);
        }
      }
    })
  );
};
