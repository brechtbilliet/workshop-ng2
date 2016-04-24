import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ApplicationState} from "../state/ApplicationState";
import {Store} from "@ngrx/store";
import {CONTAINER_COLLAPSABLESIDEBAR_TOGGLE} from "../actionTypes";

@Injectable()
export class CollapsableSidebarModel {
    public isCollapsed$: Observable<boolean>;

    constructor(private store: Store<ApplicationState>) {
        this.isCollapsed$ = this.store.select((state: ApplicationState) => state.containers.collapsableSidebar.isCollapsed);
    }

    public toggle(): void {
        this.store.dispatch({type: CONTAINER_COLLAPSABLESIDEBAR_TOGGLE});
    }
}