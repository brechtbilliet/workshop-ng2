import {Component} from "angular2/core";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {Main} from "../../../common/components/main/main.component";
import {CollapsableSidebar} from "../../../common/containers/collapsable-sidebar/collapsable-sidebar.container";
import {FavoriteWines} from "../../components/favorite-wines/favorite-wines.component";
import {NumberPicker} from "../../../common/components/number-picker/number-picker.component";
import {Rating} from "../../../common/components/rating/rating.component";
@Component({
    selector: "stock-page",
    directives: [DefaultPage, Main, CollapsableSidebar, FavoriteWines, NumberPicker, Rating],
    template: `
        <default-page>
            <collapsable-sidebar class="hidden-sm hidden-xs">
                <favorite-wines></favorite-wines>
            </collapsable-sidebar>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h2><i class="fa fa-user"></i>&nbsp;My wines <span class="badge badge-primary">5</span></h2>
                        <number-picker [amount]="5" (setAmount)="setAmount($event)"></number-picker>
                        <rating [rating]="2" (setRate)="setRate($event)" big="true"></rating>
                    </div>
                </div>
            </main>
        </default-page>
     `
})
export class StockPage {
    public setAmount(number: Number): void {
        console.log(number);
    }
    public setRate(number: Number): void {
        console.log(number);
    }
}
