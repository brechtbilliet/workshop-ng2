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
import {Account} from "../../../authentication/types/Account";
import {Authentication} from "../../../authentication/containers/authentication/authentication.container";
import {AuthenticationEndpoint} from "../../../authentication/endpoints/authentication.endpoint";
import {ApplicationState} from "../../state/ApplicationState";
import {Store} from "@ngrx/store";
@Component({
    selector: "application",
    providers: [Title, AuthenticationEndpoint],
    directives: [ROUTER_DIRECTIVES, Navbar, Spinner, Authentication],
    encapsulation: ViewEncapsulation.None,
    styles: [require("./application.container.scss")],
    template: `
        <navbar [account]="account" (logout)="logout()" *ngIf="isAuthenticated"></navbar>
        <authentication *ngIf="!isAuthenticated"></authentication>
        <router-outlet *ngIf="isAuthenticated"></router-outlet>
        <spinner></spinner>
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
    public isAuthenticated: boolean = false;
    public account: Account;

    constructor(private title: Title, private authenticationEndpoint: AuthenticationEndpoint, private store: Store<ApplicationState>) {
        this.title.setTitle("Winecellar application");
        this.authenticationEndpoint.checkInitialAuthentication();
        this.store.subscribe((state: ApplicationState) => {
            this.isAuthenticated = state.data.authentication.isAuthenticated;
            this.account = state.data.authentication.account;
        });
    }


    public logout(): void {
        this.authenticationEndpoint.logout();
    }
}