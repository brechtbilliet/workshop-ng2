import {Component} from "angular2/core";
@Component({
    selector: "spinner",
    styles: [require("./spinner.component.scss")],
    template: `
        <div class="spinner active">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>`
})
export class Spinner {
}