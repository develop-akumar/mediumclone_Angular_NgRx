import { createAction, createActionGroup, props, emptyProps } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface, signUpResponseInterface } from "src/app/shared/types/currentUser.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";
import { loginRequestInterface, loginSuccessInterface } from "../types/loginRequest.inerface";

export const authActions = createActionGroup({
    source: 'auth',
    events: {
        // action name : return value type
        Register: props<{ request: RegisterRequestInterface }>(),
        'Register Success': props<{ CurrentUser: signUpResponseInterface }>(),
        'Register Failure': props<{errors : BackendErrorsInterface}>(),  // we will not have anything back, but just type stream

        Login: props<{ request: loginRequestInterface }>(),
        'Login Success': props<{ CurrentUser: loginSuccessInterface }>(),
        'Login Failure': props<{errors : BackendErrorsInterface}>()
    }
})






// export const register = createAction(
//     "[Auth] Register",
//     props<{ request: RegisterRequestInterface }>()
// );

// export const registerSuccess = createAction(
//     "[Auth] RegisterSuccess",
//     props<{ request: RegisterRequestInterface }>()
// );

// export const registerFailure = createAction(
//     "[Auth] RegisterFailure",
//     props<{ request: RegisterRequestInterface }>()
// );

// Here we are writing ["Auth"] , which means this is a feature of the auth module.
// Also we can access it in whole application.


