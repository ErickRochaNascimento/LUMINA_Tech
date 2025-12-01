import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true; // É admin, pode passar
  } else {
    alert('Acesso negado: Apenas administradores podem ver esta página.');
    router.navigate(['/']); // Manda de volta para home
    return false;
  }
};