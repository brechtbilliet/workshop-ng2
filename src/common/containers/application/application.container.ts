import {Title} from "angular2/src/platform/browser/title";
import {Component, ViewEncapsulation} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {AboutPage} from "../../../about/containers/about-page/about-page.container";
import {EditStockPage} from "../../../stock/containers/edit-stock-page/edit-stock-page.container";
import {AddStockPage} from "../../../stock/containers/add-stock-page/add-stock-page.container";
import {StockPage} from "../../../stock/containers/stock-page/stock-page.container";
import {Navbar} from "../../components/navbar/navbar.component";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.css";
import "font-awesome/css/font-awesome.css";
import {Spinner} from "../../components/spinner/spinner.component";
import {Authentication} from "../../../authentication/containers/authentication/authentication.container";
import {AuthenticationEndpoint} from "../../../authentication/endpoints/authentication.endpoint";
import {ApplicationState} from "../../state/ApplicationState";
import {Store} from "@ngrx/store";
import {AuthenticationDataState} from "../../state/DataState";
import {Observable} from "rxjs/Observable";
import {BusyHandlerService} from "../../services/busyHandler.service";
import {WineEndpoint} from "../../../stock/endpoints/WineEndpoint";
@Component({
    selector: "application",
    providers: [Title, AuthenticationEndpoint, WineEndpoint, BusyHandlerService],
    directives: [ROUTER_DIRECTIVES, Navbar, Spinner, Authentication],
    encapsulation: ViewEncapsulation.None,
    styles: [require("./application.container.scss")],
    template: `
        <navbar [account]="(authentication$|async)?.account" (logout)="logout()" *ngIf="(authentication$|async)?.isAuthenticated"></navbar>
        <authentication *ngIf="!(authentication$|async)?.isAuthenticated"></authentication>
        <router-outlet *ngIf="(authentication$|async)?.isAuthenticated"></router-outlet>
        <spinner [spin]="isBusy$|async"></spinner>
    `
})
@RouteConfig([
    {path: "/", name: "Root", redirectTo: ["MyWines"]},
    {path: "/stock", name: "MyWines", component: StockPage},
    {path: "/stock/add", name: "AddWine", component: AddStockPage},
    {path: "/stock/:id", name: "EditWine", component: EditStockPage},
    {path: "/about", name: "About", component: AboutPage}
])
export class WineCellarApp {
    public authentication$: Observable<AuthenticationDataState>;
    public isBusy$: Observable<boolean>;

    constructor(private wineEndpoint: WineEndpoint, private title: Title,
                private authenticationEndpoint: AuthenticationEndpoint, private store: Store<ApplicationState>) {
        this.title.setTitle("Winecellar application");
        this.authenticationEndpoint.checkInitialAuthentication();
        this.authentication$ = this.store.select((state: ApplicationState) => state.data.authentication);
        this.isBusy$ = this.store.select((state: ApplicationState) => state.containers.application.isBusy);
        this.authentication$.subscribe((authenticationDataState: AuthenticationDataState) => {
            if (authenticationDataState.isAuthenticated) {
                this.wineEndpoint.load();
            }
        })
    }


    public logout(): void {
        this.authenticationEndpoint.logout();
    }
}