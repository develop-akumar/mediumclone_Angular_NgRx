import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CurrentUserInterface, signUpResponseInterface } from "src/app/shared/types/currentUser.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { Router } from "@angular/router";
import { loginSuccessInterface } from "../types/loginRequest.inerface";

export const registerEffect = createEffect(
    (
        actions$ = inject(Actions),
        authService = inject(AuthService),
    ) => {
        return actions$.pipe(
            // ofType pipe to react for register action only
            ofType(authActions.register),
            // When register function happens, below code gets executed
            // SwitchMap() returns and Observable
            // authService.register() hits an API and if successful go to map, if failure go to catch error
            switchMap(({ request }) => {
                return authService.register(request).pipe(
                    map((currentUser: signUpResponseInterface) => {
                        // window.localStorage.setItem('accessToken', currentUser.token)
                        return authActions.registerSuccess({ CurrentUser: currentUser })
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(authActions.registerFailure({ errors: errorResponse.error.errors }))
                    })
                )
            })
        )
    },
    //  second parameter = options as an Object
    { functional: true }

)


export const redirectAfterregisterEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.registerSuccess),
            tap(() => {
                router.navigateByUrl('/')
            })
        )
    },
    { functional: true, dispatch: false }
)


export const loginEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) => {
        return actions$.pipe(
            // ofType pipe to react for register action only
            ofType(authActions.login),  // action name
            // When register function happens, below code gets executed
            // SwitchMap() returns and Observable
            // authService.register() hits an API and if successful go to map, if failure go to catch error
            switchMap(({ request }) => {
                return authService.login(request).pipe(
                    map((currentUser: loginSuccessInterface) => {
                        // window.localStorage.setItem('accessToken', currentUser.token)
                        persistanceService.set('accessToken', currentUser.token)
                        return authActions.loginSuccess({ CurrentUser: currentUser })
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(authActions.loginFailure({ errors: errorResponse.error.errors }))
                    })
                )
            })
        )
    },
    //  second parameter = options as an Object
    { functional: true }

)


export const redirectAfterLoginEffect = createEffect(
    (actions$ = inject(Actions), router = inject(Router)) => {
        return actions$.pipe(
            ofType(authActions.loginSuccess),
            tap(() => {
                router.navigateByUrl('/')
            })
        )
    },
    { functional: true, dispatch: false }
)