import {Component, Input, Output, EventEmitter, ElementRef, OnDestroy} from "angular2/core";
import {WineComEndpoint, Product, WineComSearchResult} from "../../endpoints/WineComEndpoint";
import {Control} from "angular2/common";
import {Observable, Subject} from "rxjs";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: "wine-search",
    styles: [require("./wine-search.container.scss")],
    providers: [WineComEndpoint],
    template: `
        <div class="form-group has-feedback" [class.has-success]="control.valid">
            <label for="loginInput" class="col-sm-4 control-label">
                Name (*)
            </label>
            <div class="col-sm-8">
                <input type="text" 
                    [ngFormControl]="control" 
                    class="form-control input-lg" 
                    id="searchInput" 
                    autocomplete="off"
                    placeholder="Name"/>
                <span *ngIf="control.valid" 
                    class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                <ul class="wine-search-results">
                    <li *ngFor="#item of foundWines$|async" (click)="selectWine(item)">
                        <img src="{{item.labels[0].url}}" alt=""/> {{item.name}} 
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class WineSearch implements OnDestroy {
    @Input()
    public control: Control;

    @Output()
    public onSelect: EventEmitter<Product>;

    public foundWines$: Subject<Array<Product>> = new Subject();
    private subscriptions: Array<Subscription> = [];

    constructor(private el: ElementRef, private wineComEndpoint: WineComEndpoint) {
        this.onSelect = new EventEmitter();
    }

    public selectWine(wine: Product): void {
        this.onSelect.emit(wine);
        this.reset();
    }

    public reset(): void {
        this.foundWines$.next([]);
    }

    public ngOnInit(): void {
        let subscription: Subscription = Observable.fromEvent(this.el.nativeElement.querySelector("input"), "keyup")
            .map((e: any) => e.target.value)
            .do((value: string) => {
                if (value.length < 3) {
                    this.reset();
                }
            })
            .debounceTime(300)
            .filter((value: string) => value.length > 2)
            .map((value: string) => this.wineComEndpoint.search(value))
            .switch()
            .map((res: WineComSearchResult) => res.products.list)
            .subscribe(this.foundWines$);
        this.subscriptions.push(subscription);
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}