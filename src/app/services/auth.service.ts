import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LoggerService } from './logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();
  private sub!: Subscription;

  constructor(
    private logger: LoggerService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  public init() {
    this.logger.debug('init AuthService');
  }

  public login() {
    this.logger.info('login');
    this.isLoggedIn.next(true);
  }

  public logout() {
    this.logger.info('logout');
    this.isLoggedIn.next(false);
  }

  canActivate(): Observable<boolean> {
    this.sub = this.isLoggedIn$.subscribe(isLogged => {
      if (!isLogged) {
        this.snackBar.open('please Log In', 'X', { duration: 3000 });
        this.sub.unsubscribe();
        this.router.navigate(['/home']);
      }
    });

    return this.isLoggedIn$;
  }

}
