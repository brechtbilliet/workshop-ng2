import {Component} from "angular2/core";
import {DefaultPage} from "../../../common/components/default-page/default-page.component";
import {Main} from "../../../common/components/main/main.component";
import {CollapsableSidebar} from "../../../common/containers/collapsable-sidebar/collapsable-sidebar.container";
@Component({
    selector: "stock-page",
    directives: [DefaultPage, Main, CollapsableSidebar],
    template: `
        <default-page>
            <collapsable-sidebar class="hidden-sm hidden-xs">
            </collapsable-sidebar>
            <main>
                <div class="row">
                    <div class="col-sm-12">
                        <h2><i class="fa fa-user"></i>&nbsp;My wines <span class="badge badge-primary">5</span></h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8">
                        <div class="input-group">
                            <input type="text" class="form-control input-lg"/>
                            <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <a  href="javascript:void(0)" class="btn btn-primary btn-lg btn-block">
                            <i class="fa fa-plus-circle"></i>&nbsp;Add</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                    </div>
                </div>
            </main>
        </default-page>
     `
})
export class StockPage {
}
