import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../store.ts/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { selectIsSubmitting } from '../../store.ts/reducers';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';

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

  isSubmitting$ = this.store.select(selectIsSubmitting)

  constructor(private fb: FormBuilder,
    private store: Store<{auth : AuthStateInterface}>
  ) {

  }

  onSubmit() {
    console.log("form Value = ", this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue()
      
    }

    this.store.dispatch(register({request}),)
  }




}
