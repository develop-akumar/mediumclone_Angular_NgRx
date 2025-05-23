import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { authActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export const registerEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
        return actions$.pipe(
            // ofType pipe to react for register action only
            ofType(authActions.register),
            // When register function happens, below code gets executed
            // SwitchMap() returns and Observable
            // authService.register() hits an API and if successful go to map, if failure go to catch error
            switchMap(({ request }) => {
                return authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        return authActions.registerSuccess({ CurrentUser: currentUser })
                    }),
                    catchError(() => {
                        return of(authActions.registerFailure())
                    })
                )
            })
        )
    },
    //  second parameter = options as an Object
    { functional: true }

)