import {Component} from "angular2/core";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {Main} from "../../../common/components/main/main.component";
import {CollapsableSidebar} from "../../../common/containers/collapsable-sidebar/collapsable-sidebar.container";
import {FavoriteWines} from "../../components/favorite-wines/favorite-wines.component";
import {NumberPicker} from "../../../common/components/number-picker/number-picker.component";
import {Rating} from "../../../common/components/rating/rating.component";
import {ApplicationState} from "../../../common/state/ApplicationState";
import {Store} from "@ngrx/store";
import {Wine} from "../../entities/Wine";
import {Observable} from "rxjs/Observable";
import * as _ from "lodash";
import {WineResults} from "../../components/wine-results/wine-results.component";
import {WineEndpoint} from "../../endpoints/wine.endpoint";
@Component({
    selector: "stock-page",
    providers: [WineEndpoint],
    directives: [WineResults, DefaultPage, Main, CollapsableSidebar, FavoriteWines, NumberPicker, Rating],
    template: `
        <default-page>
            <collapsable-sidebar class="hidden-sm hidden-xs">
                <favorite-wines (onSetStock)="onSetStock($event)" [wines]="wines$ | async"></favorite-wines>
            </collapsable-sidebar>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h2><i class="fa fa-user"></i>&nbsp;My wines <span class="badge badge-primary">{{numberOfWines$|async}}</span></h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <wine-results [wines]="wines$|async" (remove)="onRemove($event)"></wine-results>
                    </div>
                </div>
            </main>
        </default-page>
     `
})
export class StockPage {
    public wines$: Observable<Array<Wine>> = this.store.select((state: ApplicationState) => state.data.wines);
    public numberOfWines$: Observable<number> =
        this.wines$.map((wines: Array<Wine>) => _.sumBy(wines, (wine: Wine) => wine.inStock));

    constructor(private store: Store<ApplicationState>, private wineEndPoint: WineEndpoint) {

    }

    public onSetRate(item: any): void {
        this.wineEndPoint.setRate(item.wine, item.value);
    }

    public onSetStock(item: any): void {
        this.wineEndPoint.setStock(item.wine, item.value);
    }

    public onRemove(wine: Wine): void {
        this.wineEndPoint.remove(wine);
    }
}
