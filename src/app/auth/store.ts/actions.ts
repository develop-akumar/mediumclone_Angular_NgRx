import { createAction, createActionGroup, props, emptyProps } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export const authActions = createActionGroup({
    source: 'auth',
    events: {
        // action name : return value type
        Register: props<{ request: RegisterRequestInterface }>(),
        'Register Success': props<{ CurrentUser: CurrentUserInterface }>(),
        'Register Failure': emptyProps()  // we will not have anything back, but just type stream
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


