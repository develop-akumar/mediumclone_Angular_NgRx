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

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ]
})
export class RegisterComponent {
  form: FormGroup = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  // isSubmitting$ = this.store.select(selectIsSubmitting)
  // backendErrors$ = this.store.select(selectValidationErrors)

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors)
  })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {

  }

  onSubmit() {
    console.log("form Value = ", this.form.getRawValue());
    const request: RegisterRequestInterface = this.form.getRawValue()
    request.id = 0

    this.store.dispatch(authActions.register({ request }))

    // this.authService.register(request)
    //   .subscribe((res) => {
    //     console.log('res = ', res);
    //   })
  }




}
