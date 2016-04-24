import {Component, OnDestroy} from "angular2/core";
import {Main} from "../../../common/components/main/main.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {ROUTER_DIRECTIVES, RouteParams, Router} from "angular2/router";
import {DetailWineForm} from "../../components/detail-wine-form/detail-wine-form.component";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Wine} from "../../entities/Wine";
import {WineResource} from "../../resources/wine.resource";
import {EditStockPageModel} from "../../models/editStockPage.model";
@Component({
    selector: "add-stock-page",
    providers: [WineResource, EditStockPageModel],
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
                <detail-wine-form [wine]="editWine$|async" *ngIf="editWine$|async" (onSave)="onSave($event)"></detail-wine-form>
            </div>
        </main>
    </default-page>
   
     `
})
export class EditStockPage implements OnDestroy {
    public editWine$: Observable<Wine>;
    public subscriptions: Array<Subscription> = [];

    constructor(public model: EditStockPageModel,
                private routeParams: RouteParams,
                private wineEndpoint: WineResource,
                private router: Router) {
        this.editWine$ = this.model.editWine$;
        this.subscriptions.push(this.wineEndpoint.fetchWine(routeParams.get("id")).subscribe((wine: Wine) => {
            this.model.setWine(wine);
        }));
    }

    public onSave(wine: Wine): void {
        this.wineEndpoint.update(this.routeParams.get("id"), wine);
        this.router.navigateByUrl("/stock");
    }

    public ngOnDestroy(): void {
        this.model.clearWine();
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}