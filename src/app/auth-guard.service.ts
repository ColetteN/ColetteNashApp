import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    console.log('AuthGuardService::constructor');
  }

  canActivate(): boolean {
    console.log('AuuthGuardService: canActivate');
    if ( this.authService.isLoggedIn == true) 
    {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
