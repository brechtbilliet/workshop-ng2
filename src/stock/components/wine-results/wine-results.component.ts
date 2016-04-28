import {Component, Input, Output, EventEmitter} from "angular2/core";
import {Wine} from "../../entities/Wine";
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    selector: "wine-results",
    directives: [ROUTER_DIRECTIVES],
    template: `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Region</th>
                    <th>In stock</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#wine of wines">
                    <td><img src="{{wine.image}}"></td>
                    <td>{{wine.name}}</td>
                    <td>{{wine.region}}</td>
                    <td style="min-width:80px;">
                    </td>
                    <td>{{wine.price}}</td>
                    <td></td>
                    <td>
                        <div class="pull-right">
                            <div class="btn-group">
                                <a class="btn btn-lg btn-primary" [routerLink]="['/EditWine', {id: wine._id}]">
                                    <i class="fa fa-pencil"></i>
                                </a>
                                <button class="btn btn-lg btn-danger" (click)="onRemove(wine)"><i class="fa fa-trash-o"></i></button>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr *ngIf="wines && wines.length === 0">
                    <td colspan="7">You haven't added any wines yet</td>
                </tr>
            </tbody>
        </table>
    `
})
export class WineResults {
    @Input()
    public wines: Array<Wine>;
    
    @Output()
    public remove: EventEmitter<Wine> = new EventEmitter();

    public onRemove(wine: Wine): void {
        this.remove.emit(wine);
    }
}