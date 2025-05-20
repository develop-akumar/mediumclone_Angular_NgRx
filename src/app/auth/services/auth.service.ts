import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, map } from "rxjs";

import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
    // This will register our service inn root of our project
    // This will make our service available everywhere
})
export class AuthService {
    constructor(
        private http: HttpClient
    ) { }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users'

        // const url = '/api/users'
        return this.http.post<AuthResponseInterface>(url, data)
            .pipe(map((response) => response.user))
    }
}