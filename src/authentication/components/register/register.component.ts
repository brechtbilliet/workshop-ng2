import {Panel} from "../../../common/components/panel/panel.component";
import {Component, Output, EventEmitter, ChangeDetectionStrategy} from "angular2/core";
import {ControlGroup} from "angular2/common";
import {Account} from "../../types/Account";
@Component({
    selector: "register",
    directives: [Panel],
    styles: [require("./register.component.scss")],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
           <h1>Register</h1>
           <button class="btn btn-primary" (click)="onSubmit()">Register</button>
       `
})
export class Register {
    public loginForm: ControlGroup;

    @Output()
    public authenticate: EventEmitter<Account>;

    constructor() {
        this.authenticate = new EventEmitter();
    }

    public onSubmit(): void {
        this.authenticate.emit({firstName: "test", lastName: "tester", login: "testtester", password: ""});
    }
}