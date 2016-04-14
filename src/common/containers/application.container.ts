import {Title} from "angular2/src/platform/browser/title";
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {AboutPage} from "../../about/containers/about-page/about-page.container";
import {EditStockPage} from "../../stock/containers/edit-stock-page/edit-stock-page.container";
import {AddStockPage} from "../../stock/containers/add-stock-page/add-stock-page.container";
import {StockPage} from "../../stock/containers/stock-page/stock-page.container";
@Component({
    selector: "application",
    providers: [Title],
    directives: [ROUTER_DIRECTIVES],
    template: `
        <ul class="nav navbar-nav">
            <li><a [routerLink]="['MyWines']"><i class="fa fa-user"></i>&nbsp;My wines</a></li>
            <li><a [routerLink]="['About']" ><i class="fa fa-info-circle"></i>&nbsp;About</a></li>
        </ul>
        <router-outlet></router-outlet>
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
    constructor(private title: Title) {
        this.title.setTitle("Winecellar application");
    }
}