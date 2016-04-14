class UserService {
    getAll(): Array<User> {
        return [new User("Brecht", "Billiet"), new User("John", "Doe")]
    }
}
class User{
    constructor(public firstName: string, public lastName: string){

    }
    public get fullName(): string {
        return this.firstName + " " + this.lastName;
    }
}

let service: UserService = new UserService();
let users: Array<User> = service.getAll();
users.forEach((user: User) => {
    console.log(user.fullName);
});