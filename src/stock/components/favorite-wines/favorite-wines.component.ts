import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    selector: "favorite-wines",
    directives: [ ROUTER_DIRECTIVES],
    styles: [require("./favorite-wines.component.scss")],
    template: `
        <div>
            <h2><i class="fa fa-star"></i>&nbsp;Favorites</h2>
        </div>
    `
})
export class FavoriteWines {
}