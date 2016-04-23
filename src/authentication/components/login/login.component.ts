import {Panel} from "../../../common/components/panel/panel.component";
import {ControlGroup} from "angular2/common";
import {Output, EventEmitter, Component} from "angular2/core";
import {Credentials} from "../../types/Credentials";
@Component({
    selector: "login",
    directives: [Panel],
    styles: [require("./login.component.scss")],
    template: `
           <h1>Login</h1>
           <button class="btn btn-primary" (click)="onSubmit()">Login</button>
       `
})
export class Login {
    public loginForm: ControlGroup;

    @Output()
    public authenticate: EventEmitter<Credentials>;

    constructor() {
        this.authenticate = new EventEmitter();
    }

    public onSubmit(): void {
        this.authenticate.emit({login: "johndoe", password: "testtest"});
    }
}