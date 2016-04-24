import {Injectable} from "angular2/core";
import {AuthenticationDataState} from "../state/DataState";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../state/ApplicationState";
import {Store} from "@ngrx/store";
import {AuthenticationResource} from "../../authentication/resources/authentication.resource";
import {WineResource} from "../../stock/resources/wine.resource";

@Injectable()
export class ApplicationModel {
    public authentication$: Observable<AuthenticationDataState>;
    public isBusy$: Observable<boolean>;

    constructor(private store: Store<ApplicationState>, private authenticationResource: AuthenticationResource,
                private wineResource: WineResource) {
        this.authentication$ = authenticationResource.authentication$;
        this.isBusy$ = this.store.select((state: ApplicationState) => state.containers.application.isBusy);
    }

    public init(): void {
        this.authenticationResource.checkInitialAuthentication();
        this.authenticationResource.authentication$.subscribe((state: AuthenticationDataState) => {
            if (state.isAuthenticated) {
                this.wineResource.load();
            }
        });
    }

    public logout(): void {
        this.authenticationResource.logout();
    }
}