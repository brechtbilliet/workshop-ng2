import {Component, OnInit} from "angular2/core";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {Main} from "../../../common/components/main/main.component";
import {CollapsableSidebar} from "../../../common/containers/collapsable-sidebar/collapsable-sidebar.container";
import {FavoriteWines} from "../../components/favorite-wines/favorite-wines.component";
import {Wine} from "../../entities/Wine";
import {Observable} from "rxjs/Observable";
import {WineResults} from "../../components/wine-results/wine-results.component";
import * as _ from "lodash";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Control} from "angular2/common";
import {WineResource} from "../../resources/wine.resource";
@Component({
    selector: "stock-page",
    providers: [WineResource],
    directives: [ROUTER_DIRECTIVES, DefaultPage, Main, CollapsableSidebar, FavoriteWines, WineResults],
    template: `
        <default-page>
            <collapsable-sidebar class="hidden-sm hidden-xs">
                 <favorite-wines (onSetStock)="onSetStock($event)" [wines]="wineResource.wines$ | async"></favorite-wines>
            </collapsable-sidebar>
            <main>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="input-group">
                            <input type="text" class="form-control input-lg" [ngFormControl]="searchCtrl"/>
                            <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <a [routerLink]="['AddWine']" class="btn btn-primary btn-lg btn-block">
                            <i class="fa fa-plus-circle"></i>&nbsp;Add
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <h2>
                            <i class="fa fa-user"></i>&nbsp;My wines 
                            <span class="badge badge-primary">{{numberOfWines$|async}}</span>
                        </h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <wine-results 
                            [wines]="matchingWines$| async" 
                            (onRemove)="remove($event)" 
                            (onSetRate)="onSetRate($event)" 
                            (onSetStock)="onSetStock($event)">
                        </wine-results>
                    </div>
                </div>
            </main>
        </default-page>
     `
})
export class StockPage implements OnInit {
    public matchingWines$: Observable<Array<Wine>>;
    public numberOfWines$: Observable<Number>;
    public searchCtrl: Control = new Control("");

    constructor(public wineResource: WineResource) {
    }

    public remove(wine: Wine): void {
        this.wineResource.remove(wine);
    }

    public onSetRate(item: any): void {
        this.wineResource.setRate(item.wine, item.value);
    }

    public onSetStock(item: any): void {
        this.wineResource.setStock(item.wine, item.value);
    }

    public ngOnInit(): void {
        this.matchingWines$ = Observable.combineLatest(this.searchCtrl.valueChanges.startWith(""), this.wineResource.wines$)
            .map((resp: [string, Array<Wine>]) => {
                let term: string = resp[0];
                let wines: Array<Wine> = resp[1];
                return wines.filter((wine: Wine) => wine.name.toLowerCase().indexOf(term.toLowerCase()) > -1);
            });
        this.numberOfWines$ = this.wineResource.wines$.map((wines: Array<Wine>) => {
            return _.sumBy(wines, (wine: Wine) => wine.inStock);
        });
    }
}
