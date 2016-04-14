import {User} from "./User";
import "bootstrap/dist/css/bootstrap.css";
class UserService {
    public getAll(): Array<User> {
        return [new User("Brecht", "Billiet"), new User("John", "Doe")];
    }
}

let service: UserService = new UserService();
let users: Array<User> = service.getAll();
users.forEach((user: User) => {
    alert(user.fullName + "!!!");
});