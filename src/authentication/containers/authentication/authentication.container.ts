import {Component} from "angular2/core";
import {Panel} from "../../../common/components/panel/panel.component";
import {Login} from "../../components/login/login.component";
import {Register} from "../../components/register/register.component";
import {Account} from "../../types/Account";
import {Credentials} from "../../types/Credentials";
@Component({
    selector: "authentication",
    directives: [Login, Register, Panel],
    template: `
       <div class="container">
           <panel [header]="'You need authentication'">
               <login *ngIf="curTab === 0" (authenticate)="login($event)"></login>
               <register *ngIf="curTab === 1" (authenticate)="register($event)"></register>
               <a href="javascript:void(0)" (click)="enableTab(1)" *ngIf="curTab===0">I don't have an account yet</a>
               <a href="javascript:void(0)" (click)="enableTab(0)" *ngIf="curTab===1">I have an account already</a>
           </panel>
       </div>
      `
})
export class Authentication {
    public curTab: number = 0;

    constructor() {

    }

    public enableTab(tabIndex: number): void {
        this.curTab = tabIndex;
    }

    public login(credentials: Credentials): void {
        console.log(credentials);
    }

    public register(account: Account): void {
        console.log(account);
    }
}