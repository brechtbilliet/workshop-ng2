import {Component, OnInit, ElementRef} from "angular2/core";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {Main} from "../../../common/components/main/main.component";
import {CollapsableSidebar} from "../../../common/containers/collapsable-sidebar/collapsable-sidebar.container";
import {FavoriteWines} from "../../components/favorite-wines/favorite-wines.component";
import {ApplicationState} from "../../../common/state/ApplicationState";
import {Store} from "@ngrx/store";
import {WineEndpoint} from "../../endpoints/WineEndpoint";
import {Wine} from "../../entities/Wine";
import {Observable} from "rxjs/Observable";
import {WineResults} from "../../components/wine-results/wine-results.component";
import * as _ from "lodash";
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    selector: "stock-page",
    providers: [WineEndpoint],
    directives: [ROUTER_DIRECTIVES, DefaultPage, Main, CollapsableSidebar, FavoriteWines, WineResults],
    template: `
        <default-page>
            <collapsable-sidebar class="hidden-sm hidden-xs">
                 <favorite-wines (onSetStock)="onSetStock($event)" [wines]="wines$ | async"></favorite-wines>
            </collapsable-sidebar>
            <main>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="input-group">
                            <input type="text" class="form-control input-lg"/>
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
    public wines$: Observable<Array<Wine>>;
    public matchingWines$: Observable<Array<Wine>>;
    public numberOfWines$: Observable<Number>;

    constructor(private el: ElementRef, private store: Store<ApplicationState>, private wineEndpoint: WineEndpoint) {
        this.wines$ = this.store.select((state: ApplicationState) => state.data.wines);
    }

    public remove(wine: Wine): void {
        this.wineEndpoint.remove(wine);
    }

    public onSetRate(item: any): void {
        this.wineEndpoint.setRate(item.wine, item.value);
    }

    public onSetStock(item: any): void {
        this.wineEndpoint.setStock(item.wine, item.value);
    }

    public ngOnInit(): void {
        let input$: Observable<string> = Observable.fromEvent(this.el.nativeElement.querySelector("input"), "keyup")
            .map((e: any) => e.target.value).startWith("");

        this.matchingWines$ = Observable.combineLatest(input$, this.wines$)
            .map((resp: [string, Array<Wine>]) => {
                return resp[1].filter((wine: Wine) => wine.name.toLowerCase().indexOf(resp[0].toLowerCase()) > -1);
            });
        this.numberOfWines$ = this.wines$.map((wines: Array<Wine>) => {
            return _.sumBy(wines, (wine: Wine) => {
                return wine.inStock;
            });
        });
    }
}
