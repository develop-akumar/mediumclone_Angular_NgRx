import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface"
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface"

export interface AuthStateInterface{
    isSubmitting : boolean
    currentUser : CurrentUserInterface | null | undefined
    // undefined - when not made request, null when hit API but not loged in
    //  CurrentUserInterface - when logged in
    isLoading : boolean
    validationErrors : BackendErrorsInterface | null
}