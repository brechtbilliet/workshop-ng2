import {Component} from "angular2/core";
import {CollapsableSidebarModel} from "../../models/collapsableSidebar.model";
@Component({
    selector: "collapsable-sidebar",
    providers: [CollapsableSidebarModel],
    styles: [require("./collapsable-sidebar.container.scss")],
    template: `
        <div class="collapsable-part" [class.is-collapsed]="model.isCollapsed$|async">
            <button class="btn btn-primary btn-collapsable" (click)="toggleSidebar()">
                <i class="fa" [class.fa-chevron-right]="model.isCollapsed$| async" 
                    [class.fa-chevron-left]="(model.isCollapsed$| async) === false"></i>
            </button>
            <ng-content *ngIf="(model.isCollapsed$| async) === false"></ng-content>
        </div>
    `
})
export class CollapsableSidebar {
    constructor(public model: CollapsableSidebarModel) {
    }

    public toggleSidebar(): void {
        this.model.toggle();
    }
}
