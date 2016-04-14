import {Component} from "angular2/core";
@Component({
    selector: "rating",
    styles: [require("./rating.component.scss")],
    template: `
        <i class="fa fa-star rating"></i>
        <i class="fa fa-star rating"></i>
        <i class="fa fa-star rating"></i>
        <i class="fa fa-star rating"></i>
        <i class="fa fa-star rating"></i>
        `
})
export class Rating {
}