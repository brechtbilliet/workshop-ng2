import {Component} from "angular2/core";
import {Main} from "../../../common/components/main/main.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {DetailWineForm} from "../../components/detail-wine-form/detail-wine-form.component";
import {Router} from "angular2/router";
import {Wine} from "../../entities/Wine";
import {WineResource} from "../../resources/wine.resource";
@Component({
    selector: "add-stock-page",
    directives: [DetailWineForm, DefaultPage, Main],
    providers: [WineResource],
    template: `
        <default-page>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h1><i class="fa fa-plus-circle"></i>&nbsp;Add wine</h1>
                    </div>
                </div>
                <div class="row">
                    <detail-wine-form (onSave)="onSave($event)"></detail-wine-form>
                </div>
            </main>
        </default-page>
  `
})
export class AddStockPage {
    constructor(private wineResource: WineResource,
                private router: Router) {
    }

    public onSave(wine: Wine): void {
        this.wineResource.add(wine);
        this.router.navigateByUrl("/stock");
    }
}