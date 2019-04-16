import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { OperatorFunction } from 'rxjs/interfaces';
import { ObservableInput } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) {

  }

  handleError<T>(message?: string): OperatorFunction<T, T> {
    if (!message) {
      return catchError<T, T>((error) => this.openErrorSnack(error));
    }

    return catchError<T, T>(() => this.openErrorSnack({message}));
  }

  private openErrorSnack(err): ObservableInput<any> {
    this.snackBar.open(err.message, null, {
      panelClass: 'ddap-error',
    });
    throw err;
  }
}
