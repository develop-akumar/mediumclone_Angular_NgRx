import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, map } from "rxjs";

import { RegisterRequestInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface, signUpResponseInterface } from "src/app/shared/types/currentUser.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { environment } from "src/environments/environment";
import { loginRequestInterface, loginSuccessInterface } from "../types/loginRequest.inerface";

@Injectable({
    providedIn: 'root'
    // This will register our service inn root of our project
    // This will make our service available everywhere
})
export class AuthService {
    constructor(
        private http: HttpClient
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    register(data: RegisterRequestInterface): Observable<signUpResponseInterface> {
        const url = environment.apiUrl + '/users'

        // const url = '/api/users'
        return this.http.post<signUpResponseInterface>(url, data)
            .pipe(map((response) => {
                console.log('signup response = ', response);
                return response

            }
            ))
    }


    login(data: loginRequestInterface): Observable<loginSuccessInterface> {
        const url = environment.apiUrl + '/auth/login'

        return this.http.post<loginSuccessInterface>(url, data, this.httpOptions)
            .pipe(
                map((response) => {
                console.log('login response = ', response);
                return response
            }
            ))
    }


    getAllUsers(){
        let url = 'https://fakestoreapi.com/users'
        this.http.get(url).subscribe((res)=>{
            console.log('res = ', res);
        
        })
    }
}