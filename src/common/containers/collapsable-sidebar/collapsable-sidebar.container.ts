import {Component} from "angular2/core";
@Component({
    selector: "collapsable-sidebar",
    styles: [require("./collapsable-sidebar.container.scss")],
    template: `
        <div class="collapsable-part" >
            <button class="btn btn-primary btn-collapsable">
                <i class="fa fa-chevron-left"></i>
            </button>
            <ng-content></ng-content>
        </div>
    `
})
export class CollapsableSidebar {
}