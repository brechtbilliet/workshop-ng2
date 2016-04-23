import {Component, OnDestroy} from "angular2/core";
import {Main} from "../../../common/components/main/main.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {ROUTER_DIRECTIVES, RouteParams, Router} from "angular2/router";
import {WineEndpoint} from "../../endpoints/WineEndpoint";
import {DetailWineForm} from "../../components/detail-wine-form/detail-wine-form.component";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Store} from "@ngrx/store";
import {Wine} from "../../entities/Wine";
import {ApplicationState} from "../../../common/state/ApplicationState";
import {CONTAINER_EDITSTOCKPAGE_CLEAR_WINE, CONTAINER_EDITSTOCKPAGE_SET_WINE} from "../../../common/actionTypes";
@Component({
    selector: "add-stock-page",
    providers: [WineEndpoint],
    directives: [ROUTER_DIRECTIVES, DetailWineForm, DefaultPage, Main],
    template: `
    <default-page>
        <main>
            <div class="row">
                <div class="col-sm-12">
                    <h1><i class="fa fa-pencil"></i>&nbsp;Edit wine</h1>
                </div>
             </div>
             <div class="row">
                <detail-wine-form [wine]="wine$|async" *ngIf="wine$|async" (onSave)="onSave($event)"></detail-wine-form>
            </div>
        </main>
    </default-page>
   
     `
})
export class EditStockPage implements OnDestroy {
    public wine$: Observable<Wine>;
    public subscriptions: Array<Subscription> = [];

    constructor(private routeParams: RouteParams,
                private store: Store<ApplicationState>,
                private wineEndpoint: WineEndpoint,
                private router: Router) {
        this.subscriptions.push(this.wineEndpoint.fetchWine(routeParams.get("id")).subscribe((wine: Wine) => {
            this.store.dispatch({type: CONTAINER_EDITSTOCKPAGE_SET_WINE, payload: wine});
        }));
        this.wine$ = this.store.select((state: ApplicationState) => state.containers.editStockPage.wine);
    }

    public onSave(wine: Wine): void {
        this.wineEndpoint.update(this.routeParams.get("id"), wine);
        this.router.navigateByUrl("/stock");
    }

    public ngOnDestroy(): void {
        this.store.dispatch({type: CONTAINER_EDITSTOCKPAGE_CLEAR_WINE});
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}