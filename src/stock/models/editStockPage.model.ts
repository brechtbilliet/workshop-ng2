import {Injectable} from "angular2/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../common/state/ApplicationState";
import {Observable} from "rxjs/Observable";
import {Wine} from "../entities/Wine";
import {CONTAINER_EDITSTOCKPAGE_SET_WINE, CONTAINER_EDITSTOCKPAGE_CLEAR_WINE} from "../../common/actionTypes";

@Injectable()
export class EditStockPageModel {
    public editWine$: Observable<Wine>;

    constructor(private store: Store<ApplicationState>) {
        this.editWine$ = this.store.select((state: ApplicationState) => state.containers.editStockPage.wine);
    }
    
    public setWine(wine: Wine): void {
        this.store.dispatch({type: CONTAINER_EDITSTOCKPAGE_SET_WINE, payload: wine});
    }
    
    public clearWine(): void {
        this.store.dispatch({type: CONTAINER_EDITSTOCKPAGE_CLEAR_WINE});
    }
    // constructor(private routeParams: RouteParams,
    //             private store: Store<ApplicationState>,
    //             private wineEndpoint: WineResource,
    //             private router: Router) {
    //     this.subscriptions.push(this.wineEndpoint.fetchWine(routeParams.get("id")).subscribe((wine: Wine) => {
    //         this.store.dispatch({type: CONTAINER_EDITSTOCKPAGE_SET_WINE, payload: wine});
    //     }));
    //     this.wine$ = this.store.select((state: ApplicationState) => state.containers.editStockPage.wine);
    // }
    //
    // public onSave(wine: Wine): void {
    //     this.wineEndpoint.update(this.routeParams.get("id"), wine);
    //     this.router.navigateByUrl("/stock");
    // }
    //
    // public ngOnDestroy(): void {
    //     this.store.dispatch({type: CONTAINER_EDITSTOCKPAGE_CLEAR_WINE});
    //     this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    // }
}