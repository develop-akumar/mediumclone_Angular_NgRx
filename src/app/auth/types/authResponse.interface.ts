// We are creating this interface here as this response will be same everywhere like at login, signup etc

import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export interface AuthResponseInterface{
    user : CurrentUserInterface
}