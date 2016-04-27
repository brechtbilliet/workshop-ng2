import {Component} from "angular2/core";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {Main} from "../../../common/components/main/main.component";
import {FavoriteWines} from "../../components/favorite-wines/favorite-wines.component";
@Component({
    selector: "stock-page",
    directives: [DefaultPage, Main, FavoriteWines],
    template: `
        <default-page>
            <collapsable-sidebar class="hidden-sm hidden-xs">
                <favorite-wines></favorite-wines>
            </collapsable-sidebar>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h2><i class="fa fa-user"></i>&nbsp;My wines <span class="badge badge-primary">5</span></h2>
                    </div>
                </div>
            </main>
        </default-page>
     `
})
export class StockPage {

}
