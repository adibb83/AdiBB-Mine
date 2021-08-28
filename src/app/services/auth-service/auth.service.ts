import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LoggerService } from '@services/logger/logger.service';
import { SnackbarService } from '@services/snack-bar/snackbar.service';
import { SnakbarModel } from '@models/snak-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();
  private sub!: Subscription;

  constructor(
    private logger: LoggerService,
    private snackBar: SnackbarService,
    private router: Router
  ) {}

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
    this.sub = this.isLoggedIn$.subscribe((isLogged) => {
      if (!isLogged) {
        const snackMessage: SnakbarModel = {
          message: 'please Log In',
          type: 'info',
        };
        this.snackBar.append(snackMessage);
        this.router.navigate(['/home']);
      }
    });

    this.sub.unsubscribe();
    return this.isLoggedIn$;
  }
}
