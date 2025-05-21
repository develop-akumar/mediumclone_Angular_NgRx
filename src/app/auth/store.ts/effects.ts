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
            // SwitchMap() returns and Observable
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