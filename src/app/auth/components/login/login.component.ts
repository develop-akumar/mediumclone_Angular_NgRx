import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
// import { register } from '../../store.ts/actions';
import { authActions } from '../../store.ts/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { selectIsSubmitting, selectValidationErrors } from '../../store.ts/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { combineLatest } from 'rxjs';

import { BackendErrorMessagesComponent } from 'src/app/shared/components/backend-error-messages/backend-error-messages.component';
import { loginRequestInterface } from '../../types/loginRequest.inerface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessagesComponent
  ]
})
export class LoginComponent {

  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService,
    // @Inject('apiUrl') private apiUrl:string
  ) {

  }

  // username - johnd
  // email - john@gmail.com
  // password - m38rmF$

  onSubmit() {
    if (this.form.valid) {
      console.log("form Value = ", this.form.getRawValue());
      const request: loginRequestInterface = this.form.getRawValue()

      this.store.dispatch(authActions.login({ request }))

    } else {
      console.log('the form is invalid = ',);
    }

  }

}
