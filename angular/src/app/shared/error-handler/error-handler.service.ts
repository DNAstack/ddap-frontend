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

  handleError<T>(): OperatorFunction<T, T> {
    return catchError<T, T>((error) => this.openErrorSnack(error));
  }

  private openErrorSnack(err): ObservableInput<any> {
    this.snackBar.open(err.message, 'Error', {
      panelClass: 'ddap-error',
    });
    throw err;
  }
}
