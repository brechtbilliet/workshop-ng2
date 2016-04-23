import {Http, Response} from "angular2/http";
import {Injectable} from "angular2/core";
import * as toastr from "toastr";
import {Credentials} from "../types/Credentials";
import {Account} from "../types/Account";
import {AuthenticationResult} from "../types/AuthenticationResult";
import {API_URL, DEFAULT_HEADERS, LOCALSTORAGE_AUTH} from "../../configuration";

@Injectable()
export class AuthenticationEndpoint {
    constructor(private http: Http) {
    }

    public authenticate(credentials: Credentials): void {
        this.http.post(API_URL + "/authentication/login", JSON.stringify(credentials), {headers: DEFAULT_HEADERS})
            .map((response: Response) => response.json())
            .subscribe((result: AuthenticationResult) => {
                window.localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(result));
                toastr.success("successfully logged in!");
            }, (errorResponse: Response) => {
                toastr.error(errorResponse.json().error);
            });
    }

    public register(account: Account): void {
        this.http.post(API_URL + "/authentication/register", JSON.stringify(account), {headers: DEFAULT_HEADERS})
            .map((response: Response) => response.json())
            .subscribe((result: AuthenticationResult) => {
                window.localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(result));
                toastr.success("successfully logged in!");
            }, (errorResponse: Response) => {
                toastr.error(errorResponse.json().error);
            });
    }

    public logout(): void {
        localStorage.removeItem(LOCALSTORAGE_AUTH);
    }
}