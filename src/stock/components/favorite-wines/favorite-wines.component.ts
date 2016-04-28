import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Wine} from "../../entities/Wine";
import * as _ from "lodash";
@Component({
    selector: "favorite-wines",
    directives: [ ROUTER_DIRECTIVES],
    styles: [require("./favorite-wines.component.scss")],
    template: `
        <div>
            <h2><i class="fa fa-star"></i>&nbsp;Favorites</h2>
            <table class="table table-striped">
               <tbody>
                   <tr *ngFor="#wine of wines">
                       <td style="min-width:70px;">
                       </td>
                       <td style="max-width: 200px;">{{wine.name}}</td>
                       <td>{{wine.myRating}}/5</td>
                   </tr>
               </tbody>
           </table>

        </div>
    `
})
export class FavoriteWines {
    @Input()
    public wines: Array<Wine>;

    @Output()
    public onSetStock: EventEmitter<any> = new EventEmitter();

    public getFavoriteWines(): Array<Wine> {
        return _.orderBy(this.wines, ["myRating"], ["desc"]);
    }
}