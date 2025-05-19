import { createAction, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../types/registerRequest.interface";

export const register = createAction(
    "[Auth] Register",
    props<{ request: RegisterRequestInterface }>()
);

// Here we are writing ["Auth"] , which means this is a feature of the auth module.
// Also we can access it in whole application.


