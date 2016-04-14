import {Component} from "angular2/core";
import {Main} from "../../../common/components/main/main.component";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
@Component({
    selector: "edit-stock-page",
    directives: [DefaultPage, Main],
    template: `
        <default-page>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h1><i class="fa fa-pencil"></i>&nbsp;Edit wine</h1>
                    </div>
                </div>
            </main>
        </default-page>
     `
})
export class EditStockPage {
}
