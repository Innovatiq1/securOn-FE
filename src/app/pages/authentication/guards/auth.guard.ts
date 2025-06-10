// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {


//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (this.authService.isLoggedIn()) {
//       return true;
//     } else {
//       this.router.navigate(['/authentication/login']);
//       return false;
//     }
//   }
// };
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { MsalInitService } from '../../../services/msal-init.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private msalService: MsalService, 
    private router: Router,
    private msalInitService: MsalInitService
  ) {}

  async canActivate(): Promise<boolean> {
    try {
      // Ensure MSAL is initialized before checking authentication
      await this.msalInitService.ensureInitialized();
      
      const account = this.msalService.instance.getActiveAccount();
      if (account) {
        return true;
      } else {
        this.router.navigate(['/authentication/login']);
        return false;
      }
    } catch (error) {
      console.error('Error in AuthGuard:', error);
      this.router.navigate(['/authentication/login']);
      return false;
    }
  }
}