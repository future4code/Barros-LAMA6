import User from "../model/Users/User";
import BaseDatasabe from "./BaseDatabase";

class UsersDatabase extends BaseDatasabe {
    TABLE_NAME = "lama_users"

    createUser = async (newUser: User) => {
        await UsersDatabase.connection(this.TABLE_NAME).insert(newUser)
    }

    findUser = async (email: string) => {
        return await UsersDatabase.connection(this.TABLE_NAME).select("*").whereLike("email", email)
    }
}

export default UsersDatabase