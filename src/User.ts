export class User {
    constructor(public firstName: string, public lastName: string){

    }
    public get fullName(): string {
        return this.firstName + " " + this.lastName;
    }
}