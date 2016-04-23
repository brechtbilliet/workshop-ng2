import {Http, Response} from "angular2/http";
import {Injectable} from "angular2/core";
import * as toastr from "toastr";
import {Credentials} from "../types/Credentials";
import {Account} from "../types/Account";
import {Store} from "@ngrx/store";
import {AuthenticationResult} from "../types/AuthenticationResult";
import {API_URL, DEFAULT_HEADERS, LOCALSTORAGE_AUTH} from "../../configuration";
import {
    DATA_AUTHENTICATION_CLEAR_AUTHENTICATION,
    DATA_AUTHENTICATION_SET_AUTHENTICATION
} from "../../common/actionTypes";
import {ApplicationState} from "../../common/state/ApplicationState";

@Injectable()
export class AuthenticationEndpoint {
    constructor(private http: Http, private store: Store<ApplicationState>) {
    }

    public authenticate(credentials: Credentials): void {
        this.http.post(API_URL + "/authentication/login", JSON.stringify(credentials), {headers: DEFAULT_HEADERS})
            .map((response: Response) => response.json())
            .subscribe((result: AuthenticationResult) => {
                window.localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(result));
                this.store.dispatch({type: DATA_AUTHENTICATION_SET_AUTHENTICATION, payload: result});
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
                this.store.dispatch({type: DATA_AUTHENTICATION_SET_AUTHENTICATION, payload: result});
                toastr.success("successfully logged in!");
            }, (errorResponse: Response) => {
                toastr.error(errorResponse.json().error);
            });
    }

    public logout(): void {
        this.store.dispatch({type: DATA_AUTHENTICATION_CLEAR_AUTHENTICATION});
        window.localStorage.removeItem(LOCALSTORAGE_AUTH);
    }

    public checkInitialAuthentication(): void {
        let localStorageObj: string = window.localStorage.getItem(LOCALSTORAGE_AUTH);
        if (localStorageObj) {
            this.store.dispatch({
                type: DATA_AUTHENTICATION_SET_AUTHENTICATION,
                payload: JSON.parse(localStorageObj)
            });
        }
    }
}