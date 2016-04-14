import {Title} from "angular2/src/platform/browser/title";
import {Component} from "angular2/core";
@Component({
    selector: "application",
    providers: [Title],
    template: `
        Hello world!!!
    `
})
export class WineCellarApp {
    constructor(private title: Title) {
        this.title.setTitle("Winecellar application");
    }
}